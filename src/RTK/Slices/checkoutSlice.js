import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const checkout = createAsyncThunk("checkoutSlice/checkout", async ({ cartId, url, formValues }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("No token found in localStorage");
        }
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            { shippingAddress: formValues },
            { headers: { token } }
        );

        return response.data;
    } catch (e) {
        console.log("Error", e);
        return rejectWithValue(e.response?.data || e.message)
    }
})

const checkoutSlice = createSlice({
    name: "checkoutSlice",
    initialState: {
        orderData: null,
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkout.pending, (state) => {
            state.loading = true;
            state.error = false
        }).addCase(checkout.fulfilled, (state, action) => {
            state.loading = false;
            console.log("checked out Successfuly");
            state.orderData = action.payload
        }).addCase(checkout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export default checkoutSlice.reducer;