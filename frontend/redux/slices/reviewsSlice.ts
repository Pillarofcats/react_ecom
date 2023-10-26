import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { tReview, tReviewsSlice } from "../../../backend/types/types"

const initialState:tReviewsSlice = {
  reviews: [],
  status: "pending",
  error: null
}

export const getProductReviews = createAsyncThunk("getProductReviews", async function(pid:number) {
  try {
    const response = await fetch("http://localhost:5000/api/reviews/productreview", {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ pid:pid })
    })

    const data = await response.json()
    console.log("Product Reviews", data)
    return data
  } catch(error) {
    console.error("Failed to get product reviews", error)
  }
})

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
      builder.addCase(getProductReviews.fulfilled, (state, action:PayloadAction<tReview[]>) => {
      state.reviews = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getProductReviews.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getProductReviews.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    })
  }
})

// export const { } = reviewsSlice.actions
export default reviewsSlice.reducer