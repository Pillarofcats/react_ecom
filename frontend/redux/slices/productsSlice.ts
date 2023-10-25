import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { tProductsSlice, tProduct, tType } from "../../../backend/types/types"

const initialState:tProductsSlice = {
  products: [],
  dynamicPageProduct: null,
  status: "pending",
  error: null
}

export const getProducts = createAsyncThunk("getProducts", async (productType:tType) => {
  const p = { type: productType }

  const response = await fetch(`http://localhost:5000/api/products/bytype`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(p)
  })
  return await response.json()
})

export const getSingleProduct = createAsyncThunk("querySingleProduct", async function(pid:number) {
  const p = { pid: pid }

    const response = await fetch(`http://localhost:5000/api/products/singleproduct`, {
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
    //Query all products or by type and store in products
    // setProducts: (state, action:PayloadAction<tProduct[]>) => {
    //   state.products = action.payload
    // },
    //Query individual products and push them intp dynamicPageProducts
    setDynamicPageProducts: (state, action:PayloadAction<tProduct>) => {
      state.dynamicPageProduct = action.payload
    },
  },
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

export const { setDynamicPageProducts } = productsSlice.actions
export default productsSlice.reducer