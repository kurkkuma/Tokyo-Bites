import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  phone: string;
  address: string;
}

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: "",
    phone: "",
    address: "",
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
  },
});

export const { setName, setPhone, setAddress } = userSlice.actions;
export default userSlice.reducer;
