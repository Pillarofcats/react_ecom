import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { tProduct, tProducts } from "../../../backend/types/types"

type tUserSlice  ={ 
  u_id?: number | null,
  cart: tProducts
}

const initialState:tUserSlice = {
  u_id: null,
  cart: []
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCartItem: (state, action:PayloadAction<tProduct>) => {
      state.cart.push(action.payload)
    },
    removeCartItem: (state, action:PayloadAction<string>) => {
      state.cart = state.cart.filter((product) => product.p_id !== action.payload)
    }
  }
})

export const { addCartItem, removeCartItem } = userSlice.actions
export default userSlice.reducer