import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favotiteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { setFavorites } = favotiteSlice.actions;
export default favotiteSlice.reducer;
