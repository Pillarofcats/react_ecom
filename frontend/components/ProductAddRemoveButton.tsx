import { tProductButtonType, tProduct } from "../../backend/types/types"
import { useAppDispatch } from "../redux/hooks/default"
import { addCartItem, removeCartItem } from "../redux/slices/userSlice"

export default function ProductAddRemoveButton({type, product}:{type:tProductButtonType, product:tProduct}) {
  const dispatch = useAppDispatch()

  return (
    <>
      {
        type === "buy" ?
            <button onClick={() => dispatch((addCartItem(product)))} className="productButton grid col-span-full">Add</button>
          :
            <button onClick={() => dispatch((removeCartItem(product.p_id)))} className="productButton grid col-span-full">Remove</button>
      }
    </>
  )
}
