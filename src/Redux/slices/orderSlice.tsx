import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../Screens/mislenous/axiosInstance";
import { RootState } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OrderState{
    orders:any[];
    orderDetail :any |null;
    loading:boolean;
    error:string|null;
}

const initialState:OrderState ={
    orders:[],
    orderDetail:null,
    loading:false,
    error:null,
};      


//place an order

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async ({address}:{address:string},{rejectWithValue,getState}) => {
        const state:RootState =getState();
        // const accessToken = state.auth.user?.access_token;
        const accessToken = state.auth.access_token;  // Accessing the token from auth state

        console.log("accessToken from orderSLice",accessToken);
        if(!accessToken){
            console.log("User not logged in//placeOrder and accestoken is not available");
            return rejectWithValue('User not logged in');
        }        
        try{
            const response = await axiosInstance.post('/order',
                {
                    address,
                },
                {
                    headers:{
                        access_token:accessToken,
                    },
                }
            );
            console.log("Order placed successfully//placeOrder debug from place order api");
            return response.data; 
        }
        catch (error:any){
            console.log("Failed to place order//placeOrder debug from place order api");
            return rejectWithValue (error.response?.data?.message || 'Failed to place order');
        }
    }
);

//fetch all orders
export const fetchOrderList = createAsyncThunk(
    "order/fetachOrderList",
    async (_, { rejectWithValue, getState }) => {
        const state:RootState = getState();
        const accessToken = state.auth.access_token;  // Accessing the token from auth state

        if(!accessToken){
            console.log("User not logged in//fetchOrderList's  accestoken is not available");
            return isRejectedWithValue('User not logged in');
        }
        try{
            const response = await axiosInstance.get('/orderList',{
                headers:{
                    access_token:accessToken,
                },
            });
            console.log("Order list fetched successfully//fetchOrderList debug from orderList api");
            return response.data.data;
        }
        catch(error:any){
            console.log("Failed to fetch order list//fetchOrderList debug from orderList api",error.response?.data?.message);
            return isRejectedWithValue(error.response?.data?.message || 'Failed to fetch order list');
        }
    })

//fetch order details

export const fetchOrderDetail  = createAsyncThunk(
    'order/fetchOrderDetail',
    async ({order_id}:{order_id:number},{rejectWithValue,getState}) => {
        console.log('order_id inn orderslice after dispatch........>>>',order_id)
         const state:RootState =getState();
         const accessToken = state.auth.access_token;
         console.log("fetchOrderDetail order_id debug from orderDetail api.....>>>>",order_id),

console.log("accessToken from orderDetailSLice",accessToken);
            if(!accessToken){
                console.log("User not logged in//fetchOrderDetail's  accestoken is not available");
                return rejectWithValue('User not logged in');
            }

            try{
                const response = await axiosInstance.get('/orderDetail',{
                    headers :{
                        access_token : accessToken,
                    
                    },
                    params:{
                        order_id,
                    },
                });
                console.log("Order details fetched successfully >>IT IS WORKING<<");
                return response.data.data;

            }
            catch(error:any){
                console.log("Failed to fetch order details//fetchOrderDetail debug from orderDetail api",error.response?.data?.message);
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
            }
    }
);

const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {},
    extraReducers :(builder)=>{
        builder.addCase(placeOrder.pending,(state)=>{
            state.loading = true;
            state.error=null;
        });
        builder.addCase(placeOrder.fulfilled,(state,{payload})=>{
            state.orders.push(payload);
            state.loading = false;
            state.error=null;
        });
        builder.addCase(placeOrder.rejected,(state,{payload})=>{
            state.loading = false;
            state.error=payload as string;
        });
        builder.addCase(fetchOrderList.pending,(state)=>{
            state.loading = true;
            state.error=null;
        });
        builder.addCase(fetchOrderList.fulfilled,(state,{payload})=>{
            state.orders = payload;
            state.loading = false;
            state.error=null;
        });
        builder.addCase(fetchOrderList.rejected,(state,{payload})=>{
            state.loading = false;
            state.error=payload as string;
        });
        builder.addCase(fetchOrderDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(fetchOrderDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.orderDetail = payload;
          });
          builder.addCase(fetchOrderDetail.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
          });
      
    }
});


export const selectOrders = (state:RootState) => (state as any).order.orders;
export const selectOrderDetail = (state:RootState) => (state as any).order.orderDetail;
export const selectOrderLoading = (state:RootState) => (state as any).order.loading;
export const selectOrderError = (state:RootState) => (state as any).order.error;

export default orderSlice.reducer;