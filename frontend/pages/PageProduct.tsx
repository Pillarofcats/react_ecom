import ProductCard from "../components/ProductCard"
import { useLocation } from "react-router"
// import useRemoveURLParams from "../hooks/useRemoveURLParams"

export default function PageProduct() {
  // useRemoveURLParams()
  const product = useLocation().state
  

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-5">
      <div className="flex flex-col">
        <ProductCard product={ product } />
      </div>
      
      <div>
        <h1>Reviews</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellendus magnam aut doloribus vitae magni similique corporis, dolorum iste expedita consequatur pariatur voluptatem nesciunt beatae sapiente sed assumenda ipsam necessitatibus quae distinctio, iusto asperiores? Delectus iusto soluta natus exercitationem voluptates rem officiis sequi et. Similique inventore alias soluta sed numquam!</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellendus magnam aut doloribus vitae magni similique corporis, dolorum iste expedita consequatur pariatur voluptatem nesciunt beatae sapiente sed assumenda ipsam necessitatibus quae distinctio, iusto asperiores? Delectus iusto soluta natus exercitationem voluptates rem officiis sequi et. Similique inventore alias soluta sed numquam!</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repellendus magnam aut doloribus vitae magni similique corporis, dolorum iste expedita consequatur pariatur voluptatem nesciunt beatae sapiente sed assumenda ipsam necessitatibus quae distinctio, iusto asperiores? Delectus iusto soluta natus exercitationem voluptates rem officiis sequi et. Similique inventore alias soluta sed numquam!</p>
      </div>
    </div>
  )
}
