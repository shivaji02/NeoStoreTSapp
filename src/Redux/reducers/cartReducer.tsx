import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface CartState{
    items:any[];
}

const initialState:CartState={
    items:[]    
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<any>)=>{
            // <{id:number,quantity:number}>=>{
            state.items.push(action.payload);
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
            state.items=state.items.filter((items)=>items.id!==action.payload);
        },
    },
});

export const {addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
