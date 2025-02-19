import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []
}
const cartSlice = createSlice({
    name: "cartSlice",
    initialState: getInitialCart(),
    reducers: {
        addToCart: (state, action) => {
            const productExist = state.find((product) => product.id === action.payload.id)
            if (productExist) {
                productExist.count += 1;
            }
            else {
                const cloneProduct = { ...action.payload, count: 1 };
                state.push(cloneProduct);
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteFromCart: (state, action) => {
            const newCart = state.filter((product) => product.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        },
        clearCart: () => {
            localStorage.setItem("cart", []);
            return [];
        },
        increaseProduct: (state, action) => {
            const productExist = state.find((product) => product.id === action.payload.id)
            if (productExist)
                productExist.count++;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreaseProduct: (state, action) => {
            const productExist = state.find((product) => product.id === action.payload.id)
            if (productExist) {
                if (productExist.count > 1)
                    productExist.count--;
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
    }
})
export const { addToCart, deleteFromCart, clearCart, increaseProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;