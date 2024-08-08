import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axiosInstance from "../../Screens/mislenous/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
 //import useToast  from 'react-native-toast-message';

import {  } from "../../Screens/mislenous/url";
import { Alert } from "react-native";
interface AuthState{
    user : any|null;
    isAuthenticated:boolean;
    loading:boolean;
    error:string|null;
    access_token: string|null; // Add access_token property
}

const initialState:AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    access_token: null
};



export const initializeAuth = createAsyncThunk(
    'auth/initializeAuth',
    async (_, { dispatch }) => {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        dispatch(authSlice.actions.setAuth({ accessToken: accessToken, isAuthenticated: true }));
        console.log('SavedToken', accessToken);
      }
    }
  );


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData : any,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post('users/register',userData);
            return response.data.data;
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message|| 'Failed to Register');
        }
    });


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      if (!formData?.email || !formData?.password) throw new Error('Invalid form data');

      const formdatas = new FormData();
      formdatas.append('email', formData.email);
      formdatas.append('password', formData.password);

      const response = await axiosInstance.post('/users/login', formdatas);
      const { access_token: accessToken, ...restData } = response.data;

      console.log('Full Response Data:', JSON.stringify(response.data));

      if (accessToken) {
        await AsyncStorage.setItem('access_token', accessToken);
      } else {
        await AsyncStorage.removeItem('access_token');
      }

      return restData;

    } catch (error: any) {
      let errorMessage = 'Failed to Login';

      if (error.isAxiosError && !error.response) {
        errorMessage = 'Network Error. Please check your internet connection and try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server Error. Please try again later.';
      } else if (error.response?.status === 400) {
        if (error.response?.data?.message.includes('email')) {
          errorMessage = 'User email does not exist. Please try again.';
        } else if (error.response?.data?.message.includes('password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else {
          errorMessage = 'Invalid email or password. Please try again.';
        }
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      return rejectWithValue(errorMessage);
    }
  }
);
         




    export const forgotPassword = createAsyncThunk(
        'auth/forPassword',
        async (email : any,{rejectWithValue})=>{
            try{
                const response = await axiosInstance.post('users/forgot',{email});
                return response.data.data;
            }catch(error:any){
                return rejectWithValue(error.response?.data?.message|| 'Failed to Register');
            }
        });




        
        
        
//     {name:string,email:string,password:string}, {rejectWithValue})=>{
//         try {
//             const config = {
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             }
//             const {data} = await axios.post('/api/auth/register',userData,config);
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// )



const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        logoutUser:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            AsyncStorage.removeItem('access_token');

        },
        setAuth: (state, action) => {
            state.access_token = action.payload.accessToken;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        extraReducers:(builder)=>{
            builder
            .addCase(registerUser.pending,(state: { loading: boolean; error: null; })=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled,(state: { loading: boolean; user: any; isAuthenticated: boolean; }, action:PayloadAction<any>)=>{
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })  
            .addCase(registerUser.rejected,(state: { loading: boolean; error: any; },action:PayloadAction<string|null>)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending,(state: { loading: boolean; error: null; })=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled,(state: { loading: boolean; user: any; isAuthenticated: boolean; }, action:PayloadAction<any>)=>{
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected,(state: { loading: boolean; error: any; },action:PayloadAction<string|null>)=>{
                state.loading = false;
                state.error = action.payload;  
            })
            .addCase(forgotPassword.pending,(state: { loading: boolean; error: null; })=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled,(state: { loading: boolean; user: any; isAuthenticated: boolean; }, action:PayloadAction<any>)=>{
                state.loading = false;
            })
            .addCase(forgotPassword.rejected,(state: { loading: boolean; error: any; },action:PayloadAction<string|null>)=>{
                state.loading = false;
                state.error = action.payload;
            });
        }
    
    }

});

export const {logoutUser} = authSlice.actions;
export const selectAuth = (state:RootState)=>state.auth;
export default authSlice.reducer;

