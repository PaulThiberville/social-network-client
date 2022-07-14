import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      const user = { id: action.payload.id, token: action.payload.token };
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser: (state) => {
      state.id = "";
      state.token = "";
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "",
          token: "",
        })
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
