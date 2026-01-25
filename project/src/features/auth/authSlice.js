import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: Boolean(localStorage.getItem("auth")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
      localStorage.setItem("auth", "true");
    },
    logout(state) {
      state.isAuth = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;


export const selectIsAuth = (state) => state.auth.isAuth;

export default authSlice.reducer;
