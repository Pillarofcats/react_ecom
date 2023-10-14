import ProductCard from "../components/ProductCard"
import { useNavigate } from "react-router-dom"

type tProduct = {
  p_id: string,
  title: string,
  description: string,
  price_cent: number,
  weight_lbs: number,
  product_type: string,
  quantity: number,
  quantity_sold?: number | null,
  stars: number
}

export default function Product({ product }:{ product: tProduct }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-1 p-3 mx-auto w-fit hover:cursor-pointer" onClick={() => navigate(`/products/${product.p_id}`)}>
      <ProductCard product={ product } />
    </div>
  )
}
