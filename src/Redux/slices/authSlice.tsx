import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axiosInstance from "../../Screens/mislenous/axiosInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  } from "../../Screens/mislenous/url";
interface AuthState{
    user : any|null;
    isAuthenticated:boolean;
    loading:boolean;
    error:string|null;
    access_token: string|null; // Add access_token property
}

const initialState:AuthState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null,
};



export const initializeAuth = createAsyncThunk(
    'auth/initializeAuth',
    async (_, { dispatch }) => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        dispatch(authSlice.actions.setAuth({ accessToken: token, isAuthenticated: true }));
        console.log('Saved Token', token);
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
    async ({formData,navigation}:{formData: any, navigation: any},{rejectWithValue})=>{
        try{
            const formdatas = new FormData();
            formdatas.append('email',formData.email);
            formdatas.append('password',formData.password);
            console.log(formdatas,"formdatas");
            const response = await axiosInstance.post('/users/login',formdatas);

           console.log('Response',response.data);
            ;
            const accessToken = response.data.access_token;
            console.log('Data',data);
            // Store the access token in local storage
            await AsyncStorage.setItem('access_token', response.data.access_token);
            console.log('Response Data', response.data.access_token);

            navigation.navigate('HomeNavsScreen');
            
            
        } catch(error:any){
            console.log("Error in login", error)
            if (error.isAxiosError && !error.response) {
                return rejectWithValue('Network Error');
            }
            navigation.navigate('ErrorScreen');
            return rejectWithValue(error.response?.data?.message|| 'Failed to Login' );
        }
    });






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