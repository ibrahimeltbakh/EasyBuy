import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("userToken");

export const fetchCartData = createAsyncThunk(
  "cartApiSlice/fetchCartData",
  async () => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("Error", e);
    }
  }
);
export const addProductToCart = createAsyncThunk(
  "cartApiSlice/addProductToCart",
  async (id) => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data.data.products;
    } catch (e) {
      console.log("Error", e);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "cartApiSlice/updateProduct",
  async ({ productId, productCount }, { rejectWithValue }) => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      if (!productId) {
        throw new Error("Invalid productId");
      }
      if (!productCount || isNaN(productCount)) {
        throw new Error("Invalid productCount");
      }
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: Number(productCount),
        },
        {
          headers: {
            token,
          },
        }
      );
      return response.data.data.products;
    } catch (e) {
      console.error("Error updating product:", e.response?.data || e.message);
      return rejectWithValue(e.response?.data || "Something went wrong");
    }
  }
);
export const removeProduct = createAsyncThunk(
  "cartApiSlice/removeProduct",
  async (productId) => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token
          },
        }
      );

      return response.data.data.products;
    } catch (e) {
      console.log("Error", e);
    }
  }
);
export const clearCart = createAsyncThunk(
  "cartApiSlice/clearCart",
  async () => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token
          },
        }
      );
    } catch (e) {
      console.log("Error", e);
    }
  }
);

const cartApiSlice = createSlice({
  name: "cartApiSlice",
  initialState: {
    products: [],
    cartId: "",
    cartItemsNumber: null,
    totalCartPrice: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.id = action.payload.cartId;
      state.cartItemsNumber = action.payload.numOfCartItems;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      state.products = action.payload.data.products;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("Product updated Successfuly");
      state.products = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      console.log("Product removed Successfuly");
      state.products = action.payload;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      console.log("Cart Cleard Successfuly");
      state.products = [];
    });

  },
});


export default cartApiSlice.reducer;
