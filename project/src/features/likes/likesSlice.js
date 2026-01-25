import { createSlice } from "@reduxjs/toolkit";

// Состояние: объект, где ключ - id товара, значение - { isLiked: boolean, likesCount: number }
const initialState = {};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    // Инициализация лайка для товара
    initLike(state, action) {
      const { productId, initialLikesCount = 0, initialIsLiked = false } = action.payload;
      if (!state[productId]) {
        state[productId] = {
          isLiked: initialIsLiked,
          likesCount: initialLikesCount,
        };
      }
    },
    // Переключение лайка
    toggleLike(state, action) {
      const productId = action.payload;
      if (state[productId]) {
        if (state[productId].isLiked) {
          // Убираем лайк
          state[productId].isLiked = false;
          state[productId].likesCount = Math.max(0, state[productId].likesCount - 1);
        } else {
          // Добавляем лайк
          state[productId].isLiked = true;
          state[productId].likesCount += 1;
        }
      }
    },
  },
});

export const { initLike, toggleLike } = likesSlice.actions;

// Селекторы
export const selectLike = (state, productId) => {
  return state.likes[productId] || { isLiked: false, likesCount: 0 };
};

export const selectIsLiked = (state, productId) => {
  return state.likes[productId]?.isLiked || false;
};

export const selectLikesCount = (state, productId) => {
  return state.likes[productId]?.likesCount || 0;
};

export default likesSlice.reducer;
