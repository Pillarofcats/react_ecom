import ProductCardCart from "./ProductCardCart"
import { useAppSelector } from "../redux/hooks/default"

export default function UserCart() {

  const cart = useAppSelector((state) => state.cart.cart)
  const totalPrice = cart.reduce((acc, curr) => {
    return acc + (curr.item.price_cent * curr.qty)
  }, 0)

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
      
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl font-semibold">Total Price</h1>
        <p>{`Total Price: $${(totalPrice * .01).toFixed(2)}`}</p>
      </div>
      
    </div>
  )
}
