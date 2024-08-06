import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";
import axiosInstance from "../../Screens/mislenous/axiosInstance";

 export interface ProductState { 
    products:any[];
    productDetails:any | null;
    loading:boolean;
    error:string|null;
}

const initialState : ProductState ={
    products: [],
    productDetails: null,
    loading: false,
    error: null,
};


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({categoryId,limit=10,page=1}:{categoryId:string;limit:number;page:number}, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.get('/products/getList', {
                params: {
                    product_category_id: categoryId,
                    limit,
                    page,
                },
            });
            return response.data.data;
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);
export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async (productId:string, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.get('products');
            return response.data.data;
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products details');
        }
    }
);

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending,(state)=>{
     
        state.loading = true;
        state.error = null;
    })
    builder.addCase(fetchProducts.fulfilled,(state,action:PayloadAction<any[]>)=>{
        state.loading = false;
        state.products = action.payload;
    })
    builder.addCase(fetchProducts.rejected,(state,action:PayloadAction<string | null>)=>{
        state.loading = false;
        state.error = action.payload;
    })  
    builder.addCase(fetchProductDetails.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    builder.addCase(fetchProductDetails.fulfilled,(state,action:PayloadAction<any>)=>{
        state.loading = false;
        state.productDetails = action.payload;
    })
    builder.addCase(fetchProductDetails.rejected,(state,action:PayloadAction<string | null>)=>{
        state.loading = false;
        state.error = action.payload;
    });
},

});

export const selectProducts = (state:RootState)=>state.products;
export default productSlice.reducer;





// const productSlice = createSlice({
//     name:'products',
//     initialState,
//     reducers:{
//         fetchProductsRequest:(state)=>{
//             state.loading = true;
//             state.error=null;
//         },
//         fetchProductsSuccess:(state,action:PayloadAction<[]> )=>{
//             state.loading=false;
//             state.products= action.payload;
//       },
//         fetchProductsFailure:(state,action:PayloadAction<string>)=>{
//             state.loading=false;
//             state.error= action.payload;
//         },
//     },
// });

// export const {
//   fetchProductsRequest,
//   fetchProductsSuccess,
//   fetchProductsFailure
// } = productSlice.actions;

// export default productSlice.reducer;


// : {
//   fetchProductsRequest: () => void;
//   fetchProductsSuccess: (payload: []) => void;
//   fetchProductsFailure: (payload: string) => void;
// } = productslice.actions;

//check slice keyword