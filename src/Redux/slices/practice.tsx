import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../Screens/mislenous/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';

interface UserDetails {
    user: any | null;
    username: string;
    gender: string;
    phone_no: number;
    email: string;
    is_active: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: UserDetails = {
    user: null,
    username: '',
    gender: '',
    phone_no: 0,
    email: '',
    is_active: false,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
    'userDetail/fetchUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const accessToken = state.auth.access_token;

            const response = await axiosInstance.get('user/getUserData', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            console.log("Error in @SLICE fetching userDetails", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user details"
            );
        }
    }
);

const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
                state.username = action.payload.username;
                state.gender = action.payload.gender;
                state.phone_no = action.payload.phone_no;
                state.email = action.payload.email;
                state.is_active = action.payload.is_active;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const userDetailReducer = userDetailSlice.reducer;

export const selectUserDetails = (state: RootState) => state.userDetail;

export const selectLoading = (state: RootState) => state.userDetail.loading;

export const selectError = (state: RootState) => state.userDetail.error;
