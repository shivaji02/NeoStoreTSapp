import { combineReducers } from "redux";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;