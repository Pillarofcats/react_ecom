import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks/default";
import { shallowEqual } from "react-redux";

export default function useSetLocalCart() {
  const { cart } = useAppSelector((state) => state.cart, shallowEqual);

  useEffect(() => {
    window.localStorage.setItem("3b_cart", JSON.stringify(cart));
  }, [cart]);
}
