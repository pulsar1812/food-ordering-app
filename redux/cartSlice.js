import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    numberOfItems: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.numberOfItems += 1;
      state.total += action.payload.itemPrice * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.numberOfItems = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
