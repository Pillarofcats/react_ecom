import { tPurchase } from "../../types/types"
import ProductStars from "../ProductStars"
import { useState } from "react"

export default function UserProductPurchases({ purchases }:{purchases:tPurchase[]}) {

  const [toggleView, setToggleView] = useState<boolean>(false)

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 items-center">
      <h1 className="text-center text-3xl font-semibold">User Purchases</h1>
      <button className="formButton" onClick={() => setToggleView(state => !state)}>View</button>

      <div className={`flex flex-col gap-2 items-center h-[30rem] ${toggleView ? "overflow-y-scroll" : ""}`}>
      {  toggleView ?
        purchases.map((item, i) => {
          return (
            <div key={i} className="flex-col xl:flex-row flex border-2 p-2 gap-2 w-[90%] border-[#292F36] rounded-md">
              <div className="self-center flex flex-col items-center">
                <img className="w-[15rem]" src={`/products/${item?.p_id}.jpg`} alt="product image" />
                <label>{item.title}</label>
              </div>
              
              <div className="userAccountContainer p-2 w-full">
                <p>Stars:</p>
                <ProductStars stars={item?.stars}/>
                <p>Price:</p>
                <p>$ {(item?.price_cent * .01).toFixed(2)}</p>
                <p>Date:</p>
                <p>{`${item?.purchase_date}`.slice(0,10)}</p>
                <p>Qty:</p>
                <p className="breakWord">{`${item?.qty_purchased}`}</p>
              </div>
            </div>
          )
        })
        :
        null
      }
      </div>
    </div>
  )
}
