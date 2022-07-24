import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { userActions, userReducer } from "./slices/user";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      user: userReducer,
      posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(handle401),
  });
  return store;
}

const handle401 = (store) => (next) => (action) => {
  let result = next(action);
  if (action.error?.message === "401") {
    result = next(store.dispatch(userActions.clearUser()));
  }
  return result;
};
