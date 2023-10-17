import ProductCard from "../components/ProductCard"
import { useLocation } from "react-router"

export default function PageProduct() {
  const product = useLocation().state

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <ProductCard product={ product } />
      <button className="productButton" onClick={() => console.log("Adding to cart:", product)}>Buy</button>
    </div>
  )
}
