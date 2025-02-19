import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecentProducts = createAsyncThunk("recentProductsSlice/fetchRecentProducts", async () => {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        return response.data;
    }
    catch (e) {
        console.log("Error", e);

    }


})
const recentProductsSlice = createSlice({
    name: "recentProductsSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecentProducts.fulfilled, (state, action) => {
            return action.payload.data;
        })

    }
})

export default recentProductsSlice.reducer;