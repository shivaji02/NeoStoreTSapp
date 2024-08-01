import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface ProductState { 
    products:[];
    loading:boolean;
    error:string|null;
}

const initialState : ProductState ={
    products :[],
    loading:false,
    error:null,
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        fetchProductsRequest:(state)=>{
            state.loading = true;
            state.error=null;
        },
        fetchProductsSuccess:(state,action:PayloadAction<[]> )=>{
            state.loading=false;
            state.products= action.payload;
      },
        fetchProductsFailure:(state,action:PayloadAction<string>)=>{
            state.loading=false;
            state.error= action.payload;
        },
    },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure
} = productSlice.actions;

export default productSlice.reducer;


// : {
//   fetchProductsRequest: () => void;
//   fetchProductsSuccess: (payload: []) => void;
//   fetchProductsFailure: (payload: string) => void;
// } = productslice.actions;

//check slice keyword