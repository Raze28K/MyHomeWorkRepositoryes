// src/features/shop/shopSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../data/products";

export const loadProducts = createAsyncThunk(
  "shop/loadProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchProducts();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || "Ошибка загрузки");
    }
  }
);

const initialState = {
  products: [],
  query: "",
  loading: false,
  error: "",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearQuery(state) {
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      });
  },
});

export const { setQuery, clearQuery } = shopSlice.actions;

export default shopSlice.reducer;
