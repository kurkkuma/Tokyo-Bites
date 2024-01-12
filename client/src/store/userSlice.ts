import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavoriteItem {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  price: number;
}

export interface IBasketItem extends IFavoriteItem {
  count: number;
}
interface IUser {
  _id?: string | null;
  name: string;
  phone: string;
  address: string;
  favorites: IFavoriteItem[];
  basket: IBasketItem[];
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
    favorites: [],
    basket: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    addToFavorite: (state, action: PayloadAction<IFavoriteItem>) => {
      state.user.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.user.favorites = state.user.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
    addToBasket: (state, action: PayloadAction<IBasketItem>) => {
      const existingBasketItemIndex = state.user.basket.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingBasketItemIndex !== -1) {
        state.user.basket[existingBasketItemIndex].count += 1;
      } else {
        state.user.basket.push(action.payload);
      }
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const selectedProductIndex = state.user.basket.findIndex(
        (item) => item._id === action.payload
      );

      if (state.user.basket[selectedProductIndex].count === 1) {
        state.user.basket = state.user.basket.filter(
          (item) => item._id !== action.payload
        );
      } else {
        state.user.basket[selectedProductIndex].count -= 1;
      }
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const {
  setUser,
  addToFavorite,
  deleteFavorite,
  addToBasket,
  removeFromBasket,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
