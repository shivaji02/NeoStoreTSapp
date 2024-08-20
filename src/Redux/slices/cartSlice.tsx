import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the cart item
interface CartItem {
  product_id: string;  // or number, based on your data structure
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

// Define the shape of the cart state
interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Utility function to get stored token
export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (e) {
    console.error('Failed to load token from storage', e);
    return null;
  }
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, getState }) => {
    const state: RootState = getState();
    const accessToken = state.auth.user?.access_token || await getStoredToken();

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

// Async thunk for removing from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { rejectWithValue, getState }) => {
    const state: RootState = getState();
    const accessToken = state.auth.user?.access_token;

    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }

    try {
      await axiosInstance.post(
        '/deleteCart',
        { product_id: productId },
        { headers: { access_token: accessToken } }
      );
      return productId; // Return the productId that was removed
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);


// Async thunk for listing cart items
export const listCartItems = createAsyncThunk(
  'cart/listCartItems',
  async (_, { rejectWithValue, getState }) => {
    const state: RootState = getState();
    let accessToken = state.auth.user?.access_token;

    if (!accessToken) {
      // If the access token is not in the state, retrieve it from AsyncStorage
      accessToken = await AsyncStorage.getItem('access_token');
    }

    if (!accessToken) {
      return rejectWithValue('User not logged in');
    }

    try {
      const response = await axiosInstance.get('/cart', {
        headers: {
          access_token: accessToken,
        },
      });
      return response.data.data || [];  // Ensure it always returns an array
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart items');
    }
  }
);

// Async thunk for changing cart quantity
export const changeCartQuantity = createAsyncThunk(
  'cart/changeCartQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue, getState }) => {
    const state: RootState = getState();
    const accessToken = state.auth.user?.access_token || await getStoredToken();

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
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
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
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload);
      console.log('Updated cart items:', state.cartItems);
    });
    
            builder.addCase(removeFromCart.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(listCartItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(listCartItems.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch cart items';
    });

    builder.addCase(changeCartQuantity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeCartQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
      state.loading = false;
      const index = state.cartItems.findIndex(item => item.product_id === action.payload.product_id);
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      }
    });
    builder.addCase(changeCartQuantity.rejected, (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartItemCount = (state: RootState) => state.cart.cartItems.length;

export default cartSlice.reducer;
