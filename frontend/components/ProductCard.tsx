import ProductImage from "../components/ProductImage"
import ProductTitle from "../components/ProductTitle"
import ProductStars from "../components/ProductStars"
import ProductAddRemoveButton from "./ProductAddRemoveButton"

import { tProduct, tProductButtonType } from "../../backend/types/types"

import { useAppSelector } from "../redux/hooks/default"

export default function ProductCard({ product, type }:{ product:tProduct, type:tProductButtonType }) {

  const cart = useAppSelector((state) => state.user.cart)

  console.log("CART:", cart)
  return (
    <div className="flex flex-col gap-3">

      <div className="sm:flex gap-3">
        <div className="flex flex-col m-5">
          <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
          <div className="self-center">
            <ProductTitle title={ product.title } />
            <ProductStars stars={ product.stars }/>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5 w-full">

          <div className="cartProductsContainer gap-3 px-[2rem]">
            <div className="col-span-full ml-[25%]">
              <label>Description</label>
              <p>{ `${product.description}..` }</p>
            </div>

            <div className="grid grid-cols-2 gap-2 ml-[25%]">
              <div>
                <label>Price</label>
                <p>{ `$ ${ (product.price_cent * .01).toFixed(2) }` }</p>
              </div>

              <div>
                <label>Type</label>
                <p>{ `${ product.product_type}` }</p>
              </div>

              <div>
                <label>Weight</label>
                <p>{ `${ product.weight_lbs} lbs` }</p>
              </div >

              <div>
                <label >Quantity</label>
                <p>{ `${ product.quantity}` }</p>
              </div>
            </div>

            <div className="flex justify-center col-span-full">
              <ProductAddRemoveButton type={type} product={product} />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
