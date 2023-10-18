import ProductImage from "./ProductImage"
import ProductTitle from "./ProductTitle"
import ProductStars from "../components/ProductStars"
import ProductPrice from "../components/ProductPrice"

import { tProduct } from "../../backend/types/types"

export default function ProductCardShort({ product }:{ product:tProduct }) {

  return (
    <div className="flex flex-col items-center gap-1">
      <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
      <ProductTitle title={ product.title }/>
      <ProductStars stars={ product.stars }/>
      <ProductPrice price={ product.price_cent }/>
    </div>
  )
}
