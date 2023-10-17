import ProductStars from "../components/ProductStars"
import { tProduct } from "../../backend/types/types"

export default function ProductCardShort({ product }:{ product:tProduct }) {

  return (
    <div className="flex flex-col gap-1">
      <img className="h-auto w-[15rem]" src={ `/products/${product.p_id}.jpg` } alt={ product.title } />
      <h1 className="text-xl">{ product.title }</h1>
      <ProductStars stars={ product.stars }/>
      <p>{ `$ ${ (product.price_cent * .01).toFixed(2) }` }</p>
    </div>
  )
}
