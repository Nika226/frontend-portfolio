import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockProducts from "../../data/mockData";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return mockProducts;
  },
);
// fallback to mock data if backend is unavailable

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    cartItemCount: JSON.parse(localStorage.getItem("cartItems"))?.length || 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === product.id,
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      state.cartItemCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      state.cartItemCount = state.cartItems.length;
    },
    increaseCartItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity < 99) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    decreaseCartItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload,
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartItemCount = 0;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
} = productSlice.actions;
export default productSlice.reducer;
