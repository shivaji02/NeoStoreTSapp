import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  access_token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  access_token: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch }) => {
     const accessToken = await AsyncStorage.getItem('access_token');
//    console.log('accessToken/////initialiseAuth', accessToken); working
    if (accessToken) {
      dispatch(authSlice.actions.setAuth({ accessToken, isAuthenticated: true }));
      // console.log('SavedToken @ initialiseAuth', accessToken); working

      return { accessToken };
    } else {
      dispatch(authSlice.actions.setAuth({ accessToken: null, isAuthenticated: false }));
      return null;
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('users/register', userData);
      console.log('Full Response Data in register:', JSON.stringify(response.data));
      return response.data.data;
    } catch (error: any) {
      console.log('Error in register:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to Register');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { email, password } = formData;
      if (!email || !password) throw new Error('Invalid form data');

      const response = await axiosInstance.post('/users/login', { email, password });

      console.log('Full Response Data in login:', response.data.data);

      const accessToken = response.data.data.access_token;
      
      console.log("accessToken",accessToken);

      if (accessToken) {
        console.log('accessToken@authSlice', accessToken);
        await AsyncStorage.setItem('access_token', accessToken);

        console.log('SavedTokenlognThunk@post authSlice', accessToken);
      }

      return { accessToken };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to Login';
      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forPassword',
  async (email: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('users/forgot', { email });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to Register');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.access_token = null;
      AsyncStorage.removeItem('access_token');
    },
    setAuth: (state, action) => {
      state.access_token = action.payload.accessToken;
      // state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access_token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access_token = action.payload?.accessToken || null;
        state.isAuthenticated = !!action.payload?.accessToken;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
