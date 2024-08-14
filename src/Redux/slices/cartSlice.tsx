import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartState {
  items: any;
  cartItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (e) {
    console.error('Failed to load token from storage', e);
    return null;
  }
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, getState }) => {
    const state: any = getState();
    const accessToken = state.auth.user?.access_token || await getStoredToken();

    console.log('access token--for ---addToCartSLice---', accessToken);
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
      console.log('response added to cart// add to cart item is working fine and response is good', );
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
    console.log('access token--for ---removeFromCartSLice---', accessToken);

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
    const state: RootState = getState();
    let accessToken = state.auth.user?.access_token;

    if (!accessToken) {
      // If the access token is not in the state, retrieve it from AsyncStorage
      accessToken = await AsyncStorage.getItem('access_token');
    }

    console.log('access token--for ---cartListFromCartSLice---', accessToken);

    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await axiosInstance.get('/cart', {
        headers: {
          access_token: accessToken,
        },
      });
      console.log('response of list cart items-----is working fine and response is good in [{}]');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);
export const changeCartQuantity = createAsyncThunk(
  'cart/changeCartQuantity',
  async ({ productId, quantity }: { productId: number; quantity: number }, { rejectWithValue, getState }) => {
      const state: RootState = getState() as RootState;
      const accessToken = state.auth.user?.access_token;
      console.log('access token--for ---EditFromCartSLice---', accessToken);

      if (!accessToken) {
          return rejectWithValue('User not logged in');
      }

      try {
          const response = await axiosInstance.post('/editCart',
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
          return rejectWithValue(error.response?.data?.message || 'Failed to change cart quantity');
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
      // state.error = null;
    });
    builder.addCase(listCartItems.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(listCartItems.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch cart items';
    });
  },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItemCount = (state: RootState) => state.cart.cartItems.length;  // Selector for cart item count
export default cartSlice.reducer;
