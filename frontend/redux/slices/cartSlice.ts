import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { tProduct, tCartSlice } from "../../types/types"

const initialState:tCartSlice = {
  u_id: null,
  cart: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action:PayloadAction<{qty:number, product:tProduct}>) => {
      const productIndex = state.cart.findIndex((item) => item.item.p_id === action.payload.product.p_id)
      if(productIndex >= 0) {
        const updatedQty = state.cart[productIndex].qty + action.payload.qty
        console.log("UPDATED QTY", updatedQty)
        state.cart[productIndex].qty = updatedQty
      } else {
        state.cart.push({qty:action.payload.qty, item:action.payload.product})
      }
    },
    updateCartItemQty: (state, action:PayloadAction<{qty:number, product:tProduct}>) => {
      const productIndex = state.cart.findIndex((item) => item.item.p_id === action.payload.product.p_id)
      state.cart[productIndex].qty = action.payload.qty
    },
    removeCartItem: (state, action:PayloadAction<string>) => {
      state.cart = state.cart.filter((product) => product.item.p_id !== action.payload)
    }
  }
})

export const { addCartItem, updateCartItemQty, removeCartItem } = cartSlice.actions
export default cartSlice.reducer