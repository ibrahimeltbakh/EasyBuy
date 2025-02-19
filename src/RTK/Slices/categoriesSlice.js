import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categoriesSlice/fetchCategories", async () => {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        return response.data

    } catch (e) {
        console.log("Error", e);

    }
})

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            return action.payload.data
        })
    }
})

export default categoriesSlice.reducer;