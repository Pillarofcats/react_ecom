import { tProduct } from "../../types/types"
import { useNavigate } from "react-router-dom"
import ProductCardLocalSearch from "../ProductCardLocalSearch"

export default function NavLocalSearchProducts({filteredLocalSearchProducts}:{filteredLocalSearchProducts:tProduct[]}) {

  const navigate = useNavigate()

  if(filteredLocalSearchProducts.length === 0) return null

  return (
    <div className="absolute top-[2rem] -left-[2px] flex flex-col gap-1 text-black bg-white p-3 border-2 border-[#292F36] rounded-b-md">
    {
      filteredLocalSearchProducts.map((product) => {
        return (
          <button key={product.p_id} 
            onClick={() => navigate({pathname:`/products/${product.p_id}`})}>
            <ProductCardLocalSearch product={ product } />
          </button>
        )
      })
    }
    </div>
  )
}
