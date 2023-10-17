import ProductCard from "../components/ProductCard"
import { tProduct } from "../../backend/types/types"
import { useNavigate } from "react-router-dom"

export default function Product({ product }:{ product: tProduct }) {
  const navigate = useNavigate()

  return (
    <a
      className="flex flex-col gap-1 p-3 mx-auto w-fit hover:cursor-pointer" 
      onClick={()=> navigate(`/products/${product.p_id}`, { state: product }) }
    >
      <ProductCard product={ product } />
    </a>
  )
}
