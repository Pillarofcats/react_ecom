import { tReviewsSlice } from "../../backend/types/types"
import ProductStars from "./ProductStars"

export default function ProductReviews({ rev }:{rev:tReviewsSlice}) {

  return (
    <div className="flex flex-1 flex-col gap-2 items-center p-2">
      <label className="text-2xl">Product Reviews</label>
      {
        rev.reviews.map((rev,i) => {
          return (
            <div className="grid grid-cols-[minmax(100px,_1fr)_minmax(100px,_3fr)]  gap-2 border-2 border-[#292F36] rounded-md p-2 w-full md:w-[75%]" key={i}>
              <p>Username:</p>
              <p>{`${rev?.username}`}</p>
              <p>Stars:</p>
              <ProductStars stars={rev?.stars}/>
              <p>Review:</p>
              <p>{`${rev?.review}`}</p>
            </div>
          )
        })
      }
    </div>
  )
}