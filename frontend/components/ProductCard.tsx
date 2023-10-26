import ProductImage from "../components/ProductImage"
import ProductTitle from "../components/ProductTitle"
import ProductStars from "../components/ProductStars"

import { tProduct } from "../../backend/types/types"
import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks/default"
import { addCartItem } from "../redux/slices/cartSlice"

export default function ProductCard({ product }:{ product:tProduct }) {

  const cart = useAppSelector((state) => state.cart.cart)
  const dispatch = useAppDispatch()

  const qtySelectRef = useRef<HTMLSelectElement>(null)

  const optionArray = Array.from({ length: product.quantity }, (_, i) => ++i)

  function onChangeSelectProductQty(e:React.ChangeEvent<HTMLSelectElement>) {
    if(qtySelectRef.current) qtySelectRef.current.value = e.target.value
  }

  console.log("CART:", cart)
  return (
    <div className="flex flex-col border-2 border-[#292F36] rounded-md md:w-[70%]">

      <div className="sm:flex gap-3 p-2">
        <div className="flex flex-col gap-2">
          <ProductImage src={ `/products/${product.p_id}.jpg` } alt={ product.title }/>
          <div className="flex flex-col items-center gap-1">
            <ProductTitle title={ product.title }/>
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
              <select className="hover:cursor-pointer hover:hover:bg-sky-400 rounded-l-md w-fit" 
                      ref={ qtySelectRef } onChange={ onChangeSelectProductQty }  defaultValue="1">
                      {
                        optionArray.map((qty) => <option key={qty} value={`${qty}`}>{`${qty}`}</option>)
                      }
              </select> 
              <button 
                onClick={() => dispatch((addCartItem({qty: Number(qtySelectRef.current?.value), product: product})))}
                className="productButton">
                  Add
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
