import { tReview } from "../types/types"
import ProductStars from "./ProductStars"

export default function ProductReviews({ rev }:{rev:tReview[]}) {

  return (
    <div className="flex flex-col gap-2 items-center w-full md:w-[50%] p-2">
      <label className="text-2xl">Product Reviews</label>
      {
        rev.map((rev, index) => {
          return (
            <div className="userAccountContainer border-2 border-[#292F36] rounded-md p-2 w-full md:w-[75%]"
            key={index}>
              <p>Username:</p>
              <p>{`${rev?.username}`}</p>
              <p>Stars:</p>
              <ProductStars stars={rev?.stars}/>
              <p>Date:</p>
              <p>{`${rev?.r_date}`.slice(0,10)}</p>
              <p>Review:</p>
              <p className="breakWord">{`${rev?.review}`}</p>
            </div>
          )
        })
      }
    </div>
  )
}