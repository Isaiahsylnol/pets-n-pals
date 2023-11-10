import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CartService from "../services/cart.service";

export const createCart = createAsyncThunk(
  "ecom/createCart",
  async ({ userId, status, total, products }, thunkAPI) => {
    try {
      const response = await CartService.createCart(
        userId,
        status,
        total,
        products
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const cartSlice = createSlice({
  name: "ecom",
  initialState: {
    cart: {},
  },
  extraReducers: {
    [createCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cartInfo", JSON.stringify(state.cart));
    },
  },
});
const { reducer } = cartSlice;
export default reducer;
