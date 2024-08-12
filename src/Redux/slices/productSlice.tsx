import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";
import axiosInstance from "../../Screens/mislenous/axiosInstance";

 export interface ProductState { 
    products:Product[];
    productDetails:any | null;
    loading:boolean;
    error:string|null;
}

interface Product{
    id: number;
    name: string;
    cost: number;
    product_images: string;
    rating: number;
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
            // console.log(response.data);
            // console.log("response.data.data",response.data.data);
            console.log("Api fetched all response as intended");
            return response.data.data;
           
        }catch(error:any){
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

//single product details
export const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async ({ product_id }: { product_id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/products/getDetail', {
                params: {
                    product_id: product_id,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product details');
        }
    }
);

export const productRating = createAsyncThunk(
    'products/productRating',
    async ({ product_id, rating }: { product_id: string; rating: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/products/setRating', {
                product_id,
                rating: rating || 3,
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to rate product');
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
export const selectProductDetails = (state:RootState)=>state.products.productDetails;
export const selectProductLoading = (state:RootState)=>state.products.loading;  
export const selectProductError = (state:RootState)=>state.products.error;
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