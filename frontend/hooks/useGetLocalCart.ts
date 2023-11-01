import { useEffect } from "react"
import { useAppDispatch } from "../redux/hooks/default"
import { setCart } from "../redux/slices/cartSlice"
import { tCartItem } from "../types/types"

export default function useGetLocalCart() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const cart = window.localStorage.getItem("3b_cart")

    if(!cart) return
    dispatch(setCart(JSON.parse(cart) as tCartItem[]))
  }, [])
}