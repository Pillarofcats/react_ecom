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
        const productQtyCart = state.cart[productIndex].qty
        const productQtyAdded = action.payload.qty
        const updatedProductQty = productQtyCart + productQtyAdded
        if(updatedProductQty > state.cart[productIndex].item.quantity) {
          state.cart[productIndex].qty = state.cart[productIndex].item.quantity
        } else state.cart[productIndex].qty = updatedProductQty
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
    },
    clearCart: (state) => {
      state.cart = []
    }
  }
})

export const { addCartItem, updateCartItemQty, removeCartItem, clearCart } = cartSlice.actions
export default cartSlice.reducer