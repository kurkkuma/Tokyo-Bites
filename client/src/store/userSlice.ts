import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavorite {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  price: number;
}
interface IUser {
  _id?: string | null;
  name: string;
  phone: string;
  address: string;
  password: string;
  favorites: IFavorite[];
}

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    _id: null,
    name: "",
    phone: "",
    address: "",
    password: "",
    favorites: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    addFavorite: (state, action: PayloadAction<IFavorite>) => {
      state.user.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.user.favorites = state.user.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setUser, addFavorite, deleteFavorite } = userSlice.actions;
export default userSlice.reducer;
