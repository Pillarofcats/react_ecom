import ProductImage from "../components/ProductImage"
import ProductTitle from "../components/ProductTitle"
import ProductStars from "../components/ProductStars"

import { tCartItem } from "../types/types"
import { useAppDispatch } from "../redux/hooks/default"
import { updateCartItemQty, removeCartItem } from "../redux/slices/cartSlice"

export default function ProductCardCart({ product }:{ product:tCartItem }) {
  
  const dispatch = useAppDispatch()

  const optionArray = Array.from({ length: product.item.quantity }, (_, i) => ++i)

  function onChangeSelectProductQty(e:React.ChangeEvent<HTMLSelectElement>) {
    dispatch((updateCartItemQty({qty:Number(e.currentTarget.value), product:product.item})))
  }

  return (
    <div className="flex flex-col border-2 border-[#292F36] rounded-md">

      <div className="sm:flex gap-3">
        <div className="flex flex-col m-5">
          <ProductImage src={ `/products/${product.item.p_id}.jpg` } alt={ product.item.title }/>
          <div className="self-center">
            <ProductTitle title={ product.item.title } />
            <ProductStars stars={ product.item.stars }/>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full">

          <div className="cartProductsContainer">
            <div className="col-span-full ml-[18%]">
              <label>Description</label>
              <p>{ `${product.item.description}..` }</p>
            </div>

            <div className="grid grid-cols-2 gap-2 ml-[18%]">
              <div>
                <label>Price</label>
                <p>{ `$ ${ (product.item.price_cent * .01).toFixed(2) }` }</p>
              </div>

              <div>
                <label>Type</label>
                <p>{ `${ product.item.product_type}` }</p>
              </div>

              <div>
                <label>Weight</label>
                <p>{ `${ product.item.weight_lbs} lbs` }</p>
              </div >

              <div>
                <label >Quantity</label>
                <p>{ `${ product.item.quantity}` }</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-[18%]">
              <select className="hover:cursor-pointer hover:bg-sky-400 rounded-l-md w-fit" 
                      onChange={ onChangeSelectProductQty }  
                      defaultValue={product?.qty}>
                      {
                        optionArray.map((qty) => <option key={qty} value={`${qty}`}>{`${qty}`}</option>)
                      }
              </select> 
              <button onClick={() => dispatch((removeCartItem(product.item.p_id)))}
                className="productButton">Remove</button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
