import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { tPurchase, tReview, tUserInfo, tUserSlice } from "../../types/types"

const initialState:tUserSlice = {
  user: {} ,
  reviews:[],
  purchased: [] ,
  status: "pending",
  error: null
}

  export const getUserReviews = createAsyncThunk("getUserReviews", async function(u_id:number) {

    try {
      //https://backend-production-e988.up.railway.app/api/reviews/userreviews
      const response = await fetch("http://localhost:5000/api/reviews/userreviews", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({u_id:u_id})
      })

      if(response.ok) {
        const data = await response.json()
        return data
      }
      
    } catch(error) {
      console.log("Failed to get user reviews.")
    }
  })

  export const getUserPurchases = createAsyncThunk("getUserPurchases", async function(u_id:number) {

    try {
      //https://backend-production-e988.up.railway.app/api/userinfo/userpurchases
      const response = await fetch("http://localhost:5000/api/userinfo/userpurchases", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({u_id:u_id})
      })

      if(response.ok) {
        const data = await response.json()
        return data
      }
      
    } catch(error) {
      console.log("Failed to get user purchases.")
    }
  })

export const setUserInfoOnLoad = createAsyncThunk("setUserInfoOnLoad", async function() {
  try {
    //localhost:5000
    const response = await fetch("http://localhost:5000/api/users/auth", {
      method: "GET",
      credentials: "include",
      mode: "cors"
    })

    if(response.ok) {
      const data = await response.json()
      return data
    }

  } catch(error) {
    console.log("Failed to set user info on load.")
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfoOnSignIn: (state, action:PayloadAction<tUserInfo>) => {
      state.user = action.payload
    }
  },
  extraReducers:(builder) => {
    builder.addCase(setUserInfoOnLoad.fulfilled, (state, action:PayloadAction<tUserInfo>) => {
      state.user = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(setUserInfoOnLoad.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(setUserInfoOnLoad.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    }),
    builder.addCase(getUserReviews.fulfilled, (state, action:PayloadAction<tReview[]>) => {
      state.reviews = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getUserReviews.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getUserReviews.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    }),
      builder.addCase(getUserPurchases.fulfilled, (state, action:PayloadAction<tPurchase[]>) => {
      state.purchased = action.payload
      state.status = "fulfilled"
    }),
      builder.addCase(getUserPurchases.pending, (state) => {
      state.status = "pending"
    }),
      builder.addCase(getUserPurchases.rejected, (state) => {
      state.status = "rejected"
      state.error = "Failed to fetch all products"
    })
  }
})

export const { setUserInfoOnSignIn } = userSlice.actions
export default userSlice.reducer