import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { tProduct, tCartSlice, tCartItem } from "../../types/types"

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
      if(productIndex >= 0) {
        state.cart[productIndex].qty = action.payload.qty

        window.localStorage.setItem("3b_cart", JSON.stringify([...state.cart].map((product, index) => {
          if(productIndex === index) product.qty = action.payload.qty
          return product
        })))
      }
    },
    removeCartItem: (state, action:PayloadAction<string>) => {
      state.cart = state.cart.filter((product) => product.item.p_id !== action.payload)
      window.localStorage.setItem("3b_cart", JSON.stringify([...state.cart].filter((product) => product.item.p_id !== action.payload)))
    },
    clearCart: (state) => {
      state.cart = []
      window.localStorage.setItem("3b_cart", JSON.stringify([]))
    },
    setCart: (state, action:PayloadAction<tCartItem[]>) => {
      state.cart = action.payload
    },
  }
})

export const { addCartItem, updateCartItemQty, removeCartItem, clearCart, setCart } = cartSlice.actions
export default cartSlice.reducer