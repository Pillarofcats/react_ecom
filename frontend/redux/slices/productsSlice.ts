import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { tProductsSlice, tProducts, tType } from "../../../backend/types/types"

const initialState:tProductsSlice = {
  products: [],
  type: "all",
  status: "pending",
  error: null
}

export const getProducts = createAsyncThunk("queryProducts", async (productType:tType) => {
  const p = { type: productType }
  
  const response = await fetch(`http://localhost:5000/api/products/bytype`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(p)
  })
  return await response.json()
})

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action:PayloadAction<tProducts>) => {
      state.products = action.payload
    },
    setProductType: (state, action:PayloadAction<tType>) => {
      state.type = action.payload
    },
  },
  extraReducers:(builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getProducts.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getProducts.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    })
  }
})

export const { setProducts, setProductType } = productsSlice.actions
export default productsSlice.reducer