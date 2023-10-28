import { tProduct } from "../../backend/types/types"
import { useNavigate } from "react-router-dom"
import ProductCardLocalSearch from "./ProductCardLocalSearch"

export default function NavLocalSearchProducts(
  {filteredLocalSearchProducts, setLocalSearch}:{filteredLocalSearchProducts:tProduct[], setLocalSearch:React.Dispatch<React.SetStateAction<string>>}) {

  const navigate = useNavigate()

  if(filteredLocalSearchProducts.length === 0) return null

  return (
    <div className="absolute top-20 flex flex-col gap-1 text-black bg-white p-3 border-2 border-[#292F36] rounded-md">
    {
      filteredLocalSearchProducts.map((product, ind) => {
        return (
          <button  key={ind} 
            onClick={() => {
              navigate({pathname:`/products/${product.p_id}`})
              setLocalSearch("")
            } 
          }>
            <ProductCardLocalSearch product={ product } />
          </button>
        )
      })
    }
    </div>
  )
}
