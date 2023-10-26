import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tProductsSlice, tProduct, tType } from "../../../backend/types/types"

const initialState:tProductsSlice = {
  products: [],
  dynamicPageProduct: null,
  status: "pending",
  error: null
}

export const getProducts = createAsyncThunk("getProducts", async function(productType:tType) {
  try {
    const response = await fetch(`http://localhost:5000/api/products/bytype`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ type: productType })
    })
    return await response.json()
  } catch(error) {
    console.error("Failed to get products", error)
  }
})

export const getSingleProduct = createAsyncThunk("querySingleProduct", async function(pid:number) {
  try{
    const response = await fetch(`http://localhost:5000/api/products/singleproduct`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ pid:pid })
    })
    return await response.json()
  } catch(error) {
    console.error("Failed to get single product", error)
  }
})

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getProducts.fulfilled, (state, action:PayloadAction<tProduct[]>) => {
      state.products = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getProducts.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getProducts.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    }),
    builder.addCase(getSingleProduct.fulfilled, (state, action:PayloadAction<tProduct>) => {
      state.dynamicPageProduct = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getSingleProduct.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getSingleProduct.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    })
  }
})

// export const { } = productsSlice.actions
export default productsSlice.reducer