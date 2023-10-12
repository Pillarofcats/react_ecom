import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function NavItemCart() {

  const [numItems, setNumItems] = useState(0)

  return (
    <Link to={"/cart"}
      className="flex items-center gap-1 self-center h-8 bg-orange-300 p-1 rounded-md hover:bg-orange-400">
        <p className="font-bold text-black ">{numItems}</p>
        <FaCartShopping className="text-black stroke-1" size={27} />
    </Link>
  )
}