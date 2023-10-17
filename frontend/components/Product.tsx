import ProductCardShort from "../components/ProductCardShort"
import { tProduct } from "../../backend/types/types"
import { useNavigate } from "react-router-dom"

export default function Product({ product }:{ product: tProduct }) {
  const navigate = useNavigate()

  return (
    <a
      className="flex flex-col gap-1 p-3 mx-auto w-fit h-fit hover:cursor-pointer " 
      onClick={()=> navigate({
                      pathname:`/products/${product.p_id}`,
                      search:""
                    },
                    { 
                      state: product
                    })
              }
    >
      <ProductCardShort product={ product } />
    </a>
  )
}
