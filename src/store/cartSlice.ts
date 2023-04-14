import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartState {
  cart: Array<number>,
}

const initialState: CartState = {
  cart: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action: PayloadAction<{id:number}>) => {
      state.cart.push(action.payload.id)
    },
    removeFromCart: (state,action: PayloadAction<{id:number}>)=> {
      const index = state.cart.indexOf(action.payload.id);
      if (index >-1) {
        state.cart.splice(index,1);
      }
    },
    clearCart: (state) => {
      const length = state.cart.length;
      state.cart.splice(0,length);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
