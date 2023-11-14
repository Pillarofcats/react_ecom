import { tReview } from "../../types/types"
import ProductStars from "../ProductStars"
import { useState } from "react"

export default function UserProductReviews({ rev }:{rev:tReview[]}) {

  const [toggleView, setToggleView] = useState<boolean>(false)

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 items-center">
      <h1 className="text-center text-3xl font-semibold">User Reviews</h1>
      <button className="formButton" onClick={() => setToggleView(state => !state)}>View</button>

      <div className={`flex flex-col gap-2 items-center ${toggleView && rev.length > 0 ? "overflow-y-scroll h-[30rem]" : ""}`}>
      { toggleView ?
        rev.map((rev,i) => {
          return (
            <div key={i} className="flex-col xl:flex-row flex border-2 p-2 gap-2 w-[90%] border-[#292F36] rounded-md">
              <div className="self-center flex flex-col items-center">
                <img className="w-[15rem]" src={`/products/${rev?.p_id}.jpg`} alt="product image" />
                <label>{rev.title}</label>
              </div>
              
              <div className="userAccountContainer p-2 w-full">
                <p>Stars:</p>
                <ProductStars stars={rev?.stars}/>
                <p>Date:</p>
                <p>{`${rev?.r_date}`.slice(0,10)}</p>
                <p>Review:</p>
                <p className="breakWord">{`${rev?.review}`}</p>
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