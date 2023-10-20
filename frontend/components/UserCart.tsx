import ProductCard from "./ProductCard"
import { useAppSelector } from "../redux/hooks/default"
// import { removeCartItem } from "../redux/slices/userSlice"

export default function UserCart() {

  const cart = useAppSelector((state) => state.user.cart)
  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.price_cent 
  }, 0)


  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-center text-3xl font-semibold">Items in Cart</h1>
        {
          cart.map((product, index) => {
            return (
              <div className="flex flex-col self-center" key={index}>
                <ProductCard product={product} type="remove" />
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
