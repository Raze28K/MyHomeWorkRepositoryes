// src/features/shop/shopSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectShop = (state) => state.shop;

export const selectProducts = (state) => state.shop.products;
export const selectQuery = (state) => state.shop.query;
export const selectLoading = (state) => state.shop.loading;
export const selectError = (state) => state.shop.error;

export const selectVisibleProducts = createSelector(
  [selectProducts, selectQuery],
  (products, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) =>
      (p.title || "").toLowerCase().includes(q)
    );
  }
);
