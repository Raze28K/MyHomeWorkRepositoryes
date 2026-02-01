
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedIds: [],
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const id = action.payload;
      const index = state.likedIds.indexOf(id);
      if (index === -1) {
        state.likedIds.push(id);
      } else {
        state.likedIds.splice(index, 1);
      }
    },
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
