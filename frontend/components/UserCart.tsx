import ProductCardCart from "./ProductCardCart"
import { useAppSelector, useAppDispatch } from "../redux/hooks/default"
import { clearCart } from "../redux/slices/cartSlice"
// import { tCartItem } from "../types/types"

export default function UserCart() {

  const cart = useAppSelector((state) => state.cart.cart)
  const dispatch = useAppDispatch()

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + (curr.item.price_cent * curr.qty)
  }, 0)

  async function purchase() {

    if(!cart) return

    try {
      const response = await fetch("http://localhost:5000/api/products/purchase", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({cart:cart})
      })

      console.log("response", response)

      if(response.ok) {
        console.log("successful purchase")
        dispatch(clearCart())
      }
      
    } catch(error) {
      console.log("error")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-semibold">Items in Cart</h1>

      <div className="grid gap-2">
        {
          cart.map((product, index) => {
            return (
              <div className="flex flex-col self-center" key={index}>
                <ProductCardCart product={product.item} />
              </div>
            )
          })
        }
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-semibold">Total Price</h1>
        <p>{`Total Price: $${(totalPrice * .01).toFixed(2)}`}</p>
        <button className="productButton" onClick={ purchase }>Buy</button>
      </div>
      
    </div>
  )
}
