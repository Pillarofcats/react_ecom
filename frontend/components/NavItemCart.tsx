import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useAppSelector } from "../redux/hooks/default"

export default function NavItemCart() {

  const numCartItems = useAppSelector((state) => state.cart.cart.length)
//hidden
  return (
    <Link to={"/cart"}
      className="flex items-center gap-1 self-center h-8 bg-sky-300 p-1 rounded-md hover:bg-sky-400 min-w-fit">
        <p className="font-bold text-black ">{numCartItems}</p>
        <FaCartShopping className="text-black stroke-1" size={27} />
    </Link>
  )
}