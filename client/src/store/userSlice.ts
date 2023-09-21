import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteType } from "../components/favorite/Favorite";

interface IUser {
  _id?: string | null;
  name: string;
  phone: string;
  address: string;
  favorites: FavoriteType[];
}

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    _id: null,
    name: "",
    phone: "+380",
    address: "",
    favorites: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.user.phone = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.user.address = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteType>) => {
      state.user.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.user.favorites = state.user.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setName,
  setPhone,
  setAddress,
  setUser,
  addFavorite,
  deleteFavorite,
} = userSlice.actions;
export default userSlice.reducer;
