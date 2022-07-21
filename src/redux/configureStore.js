import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { userReducer } from "./slices/user";

export default function configureAppStore() {
  const store = configureStore({
    reducer: {
      user: userReducer,
      posts: postsReducer,
    },
  });
  return store;
}
