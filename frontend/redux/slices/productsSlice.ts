import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tProductsSlice, tProduct, tType } from "../../types/types";

const initialState: tProductsSlice = {
  products: [],
  productsCpy: [],
  dynamicPageProduct: null,
  status: "pending",
  error: null,
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async function (productType: tType) {
    try {
      const response = await fetch(
        "https://backend-production-e988.up.railway.app/api/products/bytype",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: productType }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log("Failed to get products");
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "querySingleProduct",
  async function (pid: number) {
    try {
      const response = await fetch(
        "https://backend-production-e988.up.railway.app/api/products/singleproduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pid: pid }),
        }
      );

      if (response.ok) {
        const data = response.json();
        return data;
      }
    } catch (error) {
      console.log("Failed to get single product");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = state.productsCpy;
    },
    resetDynamicPageProduct: (state) => {
      state.dynamicPageProduct = null;
    },
    getSearchProducts: (state, action: PayloadAction<string>) => {
      const products = [...state.products];
      state.products = products.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<tProduct[]>) => {
        state.products = action.payload;
        state.productsCpy = action.payload;
        state.status = "fulfilled";
      }
    ),
      builder.addCase(getProducts.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(getProducts.rejected, (state) => {
        state.status = "rejected";
        state.error = "Failed to fetch all products";
      }),
      builder.addCase(
        getSingleProduct.fulfilled,
        (state, action: PayloadAction<tProduct>) => {
          state.dynamicPageProduct = action.payload;
          state.status = "fulfilled";
        }
      ),
      builder.addCase(getSingleProduct.pending, (state) => {
        state.status = "pending";
      }),
      builder.addCase(getSingleProduct.rejected, (state) => {
        state.status = "rejected";
        state.error = "Failed to fetch all products";
      });
  },
});

export const { resetProducts, resetDynamicPageProduct, getSearchProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
