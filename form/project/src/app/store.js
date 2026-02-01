// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import likesReducer from "../features/likes/likesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    likes: likesReducer,
  },
});
