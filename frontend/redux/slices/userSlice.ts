import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { tUserInfo, tUserSlice } from "../../types/types"

const initialState:tUserSlice = {
  user: {} as tUserInfo | null,
  status: "pending",
  error: null
}

export const setUserInfoOnLoad = createAsyncThunk("setUserInfoOnLoad", async function() {
  try {
    const response = await fetch("http://localhost:5000/api/users/auth", {
      method: "GET",
      credentials: "include",
      mode: "cors"
    })

    if(!response.ok) throw new Error(`Failed to auth user`)

    const data = await response.json()
    console.log("data", data)

    return data

  } catch(error) {
    console.error("Error:", error)
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
    })
  }
})

export const { setUserInfoOnSignIn } = userSlice.actions
export default userSlice.reducer