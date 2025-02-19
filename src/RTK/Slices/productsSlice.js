import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
    try {
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        return response.data;
    } catch (e) {
        console.log("Error", e);

    }
})

const productsSlice = createSlice({
    name: "ProductsSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload.data;
        }
        )
    }
})
// export const {} = productsSlice.actions
export default productsSlice.reducer;