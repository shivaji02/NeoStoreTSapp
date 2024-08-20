// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import productReducer from './slices/productSlice';
// import cartReducer from './slices/cartSlice';
// import userDetailsReducer from './slices/userDetailsSlice';
// import orderReducer from './slices/orderSlice'
// import addressReducer from './slices/addressSlice'

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     products: productReducer,
//     cart: cartReducer,
//     user: userDetailsReducer,
//     order: orderReducer,
//     address: addressReducer,
    
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userDetailsReducer from './slices/userDetailsSlice';
import orderReducer from './slices/orderSlice';
import addressReducer from './slices/addressSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    user: userDetailsReducer,
    order: orderReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: process.env.NODE_ENV !== 'production',
      immutableCheck: process.env.NODE_ENV !== 'production',
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
