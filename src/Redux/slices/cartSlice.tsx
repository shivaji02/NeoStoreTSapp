import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import { RootState } from '../store';

interface CartState {
  cartItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, getState }) => {
    const state: any = getState();
    const accessToken = state.auth.user?.access_token;
    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }
    try {
      const response = await axiosInstance.post(
        '/addToCart',
        {
          product_id: productId,
          quantity,
        },
        {
          headers: {
            access_token: accessToken,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: number, { rejectWithValue, getState }) => {
    const state: any = getState();
    const accessToken = state.auth.user?.access_token;
    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }
    try {
      const response = await axiosInstance.post(
        '/deleteCart',
        {
          product_id: productId,
        },
        {
          headers: {
            access_token: accessToken,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const listCartItems = createAsyncThunk(
  'cart/listCartItems',
  async (_, { rejectWithValue, getState }) => {
    const state: RootState = getState() as RootState;
    const accessToken = state.auth.user?.access_token;
    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }
    try {
      const response = await axiosInstance.get('/cart', {
        headers: {
          access_token: accessToken,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.cartItems.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload.product_id);
    });
    builder.addCase(removeFromCart.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(listCartItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(listCartItems.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(listCartItems.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItemCount = (state: RootState) => state.cart.cartItems.length;  // Selector for cart item count
export default cartSlice.reducer;
