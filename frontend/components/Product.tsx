import ProductCardShort from "../components/ProductCardShort"
import { tProduct } from "../types/types"

import { useNavigate } from "react-router-dom"

export default function Product({ product }:{ product: tProduct }) {

  const navigate = useNavigate()

  return (
    <button
      className="h-fit w-fit p-2 hover:cursor-pointer"
      onClick={() => navigate({ pathname:`/products/${product.p_id}` }) }>
        <ProductCardShort product={ product } />
    </button>
  )
}
