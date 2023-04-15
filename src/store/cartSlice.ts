import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

export type CartState = {
  cart: Array<number>,
  status: null | 'loading' | 'resolved' | 'rejected',
  error: null | string,
}

const initialState: CartState = {
  cart: [],
  status:null,
  error:null,
};

export const sendCart = createAsyncThunk(
  'cart/sendCart',
  async (payload:string,{ rejectWithValue }) => {
    try {
      console.log(payload)
      const response = await fetch('https://app.aaccent.su/js/confirm.php',{
        method:'POST',
        body:payload
      });
      const data  = await response.json()
      return data;
    } catch (error) {
      return  rejectWithValue(error)
    }
  }
)


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
  extraReducers: (builder) => {
    builder.addCase(sendCart.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    }),
    builder.addCase(sendCart.fulfilled, (state) => {
      state.status = 'resolved';
    }),
    builder.addCase(sendCart.rejected, (state,action) => {
      state.status = 'rejected';
      state.error = action.error.message ?? '';
    })
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
