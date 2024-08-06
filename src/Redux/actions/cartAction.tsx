import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart,removeFromCart } from "../slices/cartSlice";

export const addItemToCart = (product:any)=>async (dispatch:Dispatch)=>{
    dispatch(addToCart(product));

    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart):[];
    cartItems.push(product);
    await AsyncStorage.setItem('cart',JSON.stringify(cartItems));
}

export const removeItemFromCart = (productId:number)=>async (dispatch:Dispatch)=>{
    dispatch(removeFromCart(productId));
    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart):[];
    const newCart = cartItems.filter((item:any)=>item.id!==productId);
    await AsyncStorage.setItem('cart',JSON.stringify(newCart));
}