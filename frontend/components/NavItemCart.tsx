import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"

import { useAppSelector } from "../redux/hooks/default"

export default function NavItemCart() {

  const numCartItems = useAppSelector((state) => state.cart.cart.length)

  return (
    <Link to={"/cart"}
      className="md:flex hidden items-center gap-1 self-center h-8 bg-orange-300 p-1 rounded-md hover:bg-orange-400 min-w-fit">
        <p className="font-bold text-black ">{numCartItems}</p>
        <FaCartShopping className="text-black stroke-1" size={27} />
    </Link>
  )
}