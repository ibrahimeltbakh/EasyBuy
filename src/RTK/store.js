import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './Slices/productsSlice';
// import cartSlice from './Slices/cartSlice';
import cartApiSlice from './Slices/cartSlicewithAPI';
import userSlice from './Slices/userTokenSlice';
import recentProductsSlice from './Slices/recentProducts';
import categoriesSlice from './Slices/categoriesSlice';
import checkoutSlice from "./Slices/checkoutSlice"

export const store = configureStore({
    reducer: {
        products: productsSlice,
        // cart: cartSlice,
        cart: cartApiSlice,
        checkout: checkoutSlice,
        userToken: userSlice,
        recentProducts: recentProductsSlice,
        categories: categoriesSlice
    }
})