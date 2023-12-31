import ProductCardCart from "./ProductCard/ProductCardCart";
import { useAppSelector, useAppDispatch } from "../redux/hooks/default";
import { clearCart } from "../redux/slices/cartSlice";
import { tCartSlice } from "../types/types";

import { getUserPurchases } from "../redux/slices/userSlice";

export default function UserCart() {
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.item.price_cent * curr.qty;
  }, 0);

  async function purchase() {
    if (!cart) return;

    const userCart: tCartSlice = { cart: cart };
    if (user) userCart.u_id = user.u_id;

    try {
      const response = await fetch(
        "https://backend-production-e988.up.railway.app/api/products/purchase",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userCart),
        }
      );

      if (response.ok) {
        dispatch(clearCart());
        if (user?.u_id) dispatch(getUserPurchases(user.u_id));
      }
    } catch (error) {
      console.log("Failed to purchase items.");
    }
  }

  return (
    <div className="flex flex-col py-2 gap-2 h-full">
      <h1 className="self-center flex items-center text-3xl font-semibold">
        Items in Cart
      </h1>

      <div className="grid gap-2 flex-1">
        {cart.map((product) => {
          return (
            <div
              className="flex flex-col self-center"
              key={product.item.p_id}>
              <ProductCardCart product={product} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2 py-2">
        <h1 className="text-center text-3xl font-semibold">Total Price</h1>
        <p>{`Total Price: $${(totalPrice * 0.01).toFixed(2)}`}</p>
        <button
          className="productButton"
          onClick={purchase}>
          Buy
        </button>
      </div>
    </div>
  );
}
