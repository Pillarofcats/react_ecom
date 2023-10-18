import ProductCardShort from "../components/ProductCardShort"
import { tProduct } from "../../backend/types/types"

import { useNavigate } from "react-router-dom"

export default function Product({ product }:{ product: tProduct }) {

  const navigate = useNavigate()

  return (
    <a
      className="flex flex-col h-fit gap-1 p-3 hover:cursor-pointer" 
      onClick={() => navigate({ pathname:`/products/${product.p_id}` }) }>
        <ProductCardShort product={ product } />
    </a>
  )
}
