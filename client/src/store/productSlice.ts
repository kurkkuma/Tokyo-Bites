import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  _id: string;
  url: string;
  name: string;
  price: number;
  description: string;
  composition: string;
  kcal: number;
  weight: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  tags: string[];
  category: string;
}

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;
