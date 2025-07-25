import { configureStore } from "@reduxjs/toolkit";
import popupReducer from './popup'
import productsReducer from './products'
import userReducer from './user'
const store = configureStore({
    reducer:{
        popup: popupReducer,
        products : productsReducer,
        user : userReducer
    }
})
export default store