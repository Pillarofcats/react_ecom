import ProductStars from "../components/ProductStars"
import { tProduct } from "../../backend/types/types"

export default function ProductCard({ product }:{ product:tProduct }) {

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        <img className="h-auto w-[15rem]" src={ `/products/${product.p_id}.jpg` } alt={ product.title } />
        <label className="text-xl">{ product.title }</label>
        <ProductStars stars={ product.stars }/>
        <p>{ `$ ${ (product.price_cent * .01).toPrecision(2) }` }</p>
        <button className="productButton" onClick={() => console.log("Adding to cart:", product)}>Buy</button>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <label>Description</label>
          <i className="block w-[15rem] ml-3">{ `${product.description}..` }</i>
        </div>
        <div>
          <label>Type</label>
          <p className="ml-3">{ `${ product.product_type}` }</p>
        </div>
        <div>
          <label>Weight</label>
          <p className="ml-3">{ `${ product.weight_lbs} lbs` }</p>
        </div>
        <div>
          <label>Quantity</label>
          <p className="ml-3">{ `${ product.quantity}` }</p>
        </div>
      </div>
    </div>
  )
}
