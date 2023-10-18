import ProductImage from "../components/ProductImage"
import ProductTitle from "../components/ProductTitle"
import ProductStars from "../components/ProductStars"
import { tProduct } from "../../backend/types/types"

export default function ProductCard({ product }:{ product:tProduct }) {

  return (
    <div className="flex flex-col w-screen items-center gap-3">

      <div className="sm:flex gap-3">
        <div className="flex flex-col m-5">
          <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
          <div className="self-center">
            <ProductTitle title={ product.title } />
            <ProductStars stars={ product.stars }/>
          </div>
        </div>

        <div className="flex flex-col gap-3 m-5">
          <div>
            <label>Price</label>
            <p className="ml-3">{ `$ ${ (product.price_cent * .01).toPrecision(2) }` }</p>
          </div>
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

      <button className="productButton" onClick={() => console.log("Adding to cart:", product)}>Buy</button>
    </div>
  )
}
