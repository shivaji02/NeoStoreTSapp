import axios from "axios";

import { UseDispatch } from "react-redux";
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from "../slices/productSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchProducts =()=> async(dispatch:Dispatch)=>{
    try{
        dispatch(fetchProductsRequest());
        const {data} = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/products/getList',{
            params:{product_category_id:'1', limit:10},
        });
        dispatch(fetchProductsSuccess(data.data));
    }catch(error: any){
        dispatch(fetchProductsFailure(error.message));
    }
};
