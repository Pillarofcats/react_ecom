import ProductImage from "./ProductImage"
import ProductTitle from "./ProductTitle"
import ProductStars from "../components/ProductStars"
import ProductPrice from "../components/ProductPrice"

import { tProduct } from "../types/types"

export default function ProductCardShort({ product }:{ product:tProduct }) {

  return (
    <div className="flex flex-col items-center gap-1 pb-1 border-2 rounded-md border-[#292F36]">
      <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
      <ProductTitle title={ product.title }/>
      <ProductStars stars={ product.stars }/>
      <p className={product.num_reviews ? "" : "invisible"}>({product.num_reviews ? `${product.num_reviews}` : 0}) Reviews</p>
      <ProductPrice price={ product.price_cent }/>
    </div>
  )
}
