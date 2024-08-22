import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import { RootState } from '../store';

// Define the initial state for the slice
interface UserDetailsState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailsState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.access_token;
     console.log(accessToken,"savedToken in userSlice for fetchUserDetails");

if (!accessToken) {
    console.log("Access token is missing fetch userdetails");
    throw new Error('Access token is missing');
}

      const response = await axiosInstance.get('users/getUserData', {
        headers: {
            access_token: `${accessToken}`,
        },
      });
      // console.log(response.data.data.user_data,"response.data.user_data");
      
      return response.data.data.user_data;

    } catch (error: any) {
        // console.log(error);
        console.log(`Failed to fetch user details ${error.response?.data?.message}`);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

// Async thunk to update user details
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: any, { getState, rejectWithValue }) => {

    try {
      const state = getState() as RootState;
      const accessToken = state.auth.access_token;
     console.log(accessToken,"savedToken in userSlice for UpdateDetails");
     console.log("updateUser from updateSlice",userData)

if (!accessToken) {
    console.log("Access token is missing fetch updatedetails");
    throw new Error('Access token is missing');
}

      const response = await axiosInstance.post('users/update', userData, {
        headers: {
          access_token: `${accessToken}`,
        },
      });
      console.log("reponse details", response.data)
      
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user details');
    }
  }
);

// Async thunk to change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData: { oldPassword: string; newPassword: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.access_token;

      const response = await axiosInstance.post('user/changePassword', passwordData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

// Create the slice
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUserDetails = (state: RootState) => state.user;
export const { reducer: userDetailsReducer } = userDetailsSlice;

export default userDetailsReducer;

