import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import messageReducer from './slices/message';
// Holder of Application state
const reducer = {
    auth: authReducer,
    cart: cartReducer,
    message: messageReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true
})

export default store;