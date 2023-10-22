import ProductCardShort from "../components/ProductCardShort"
import { tProduct } from "../../backend/types/types"

import { useNavigate } from "react-router-dom"

export default function Product({ product }:{ product: tProduct }) {

  const navigate = useNavigate()

//self-center
  return (
    <a
      className="h-fit w-fit p-2 hover:cursor-pointer" 
      onClick={() => navigate({ pathname:`/products/${product.p_id}` }) }>
        <ProductCardShort product={ product } />
    </a>
  )
}
