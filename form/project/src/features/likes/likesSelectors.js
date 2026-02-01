
export const selectLikedIds = (state) => state.likes.likedIds;

export const selectIsLiked = (state, productId) =>
  state.likes.likedIds.includes(Number(productId));

export const selectLikesCount = (state, productId) =>
  state.likes.likedIds.includes(Number(productId)) ? 1 : 0;
