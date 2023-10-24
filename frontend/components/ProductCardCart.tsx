import ProductImage from "../components/ProductImage"
import ProductTitle from "../components/ProductTitle"
import ProductStars from "../components/ProductStars"

import { tProduct } from "../../backend/types/types"
import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks/default"
import { updateCartItemQty, removeCartItem } from "../redux/slices/cartSlice"

export default function ProductCardCart({ product }:{ product:tProduct }) {

  const cart = useAppSelector((state) => state.cart.cart)
  const currentCartProduct = useAppSelector((state) => state.cart.cart.find((item) => item.item.p_id === product.p_id))
  const dispatch = useAppDispatch()

  const qtySelectRef = useRef<HTMLSelectElement>(null)

  const optionArray = Array.from({ length: product.quantity }, (_, i) => ++i)

  function onChangeSelectProductQty(e:React.ChangeEvent<HTMLSelectElement>) {
    if(qtySelectRef.current) {
      dispatch((updateCartItemQty({qty:Number(qtySelectRef.current.value), product:product})))
      qtySelectRef.current.value = e.target.value
    }
  }

  console.log("CART:", cart)
  return (
    <div className="flex flex-col border-2 border-[#292F36] rounded-md">

      <div className="sm:flex gap-3">
        <div className="flex flex-col m-5">
          <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
          <div className="self-center">
            <ProductTitle title={ product.title } />
            <ProductStars stars={ product.stars }/>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full">

          <div className="cartProductsContainer">
            <div className="col-span-full ml-[18%]">
              <label>Description</label>
              <p>{ `${product.description}..` }</p>
            </div>

            <div className="grid grid-cols-2 gap-2 ml-[18%]">
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
            <div className="grid grid-cols-2 gap-2 ml-[18%]">
              <select className="hover:cursor-pointer hover:bg-sky-400 rounded-l-md w-fit" 
                      ref={ qtySelectRef } onChange={ onChangeSelectProductQty }  defaultValue={currentCartProduct?.qty}>
                      {
                        optionArray.map((qty) => <option key={qty} value={`${qty}`}>{`${qty}`}</option>)
                      }
              </select> 
              <button onClick={() => dispatch((removeCartItem(product.p_id)))} className="productButton">Remove</button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
