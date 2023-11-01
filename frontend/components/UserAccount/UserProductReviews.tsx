import { tReview } from "../../types/types"
import ProductStars from "../ProductStars"

export default function UserProductReviews({ rev }:{rev:tReview[]}) {

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 items-center">
      <h1 className="text-center text-3xl font-semibold">User Reviews</h1>
      {
        rev.map((rev,i) => {
          return (
            <div key={i} className="flex-col xl:flex-row flex border-2 p-2 gap-2 w-[90%] border-[#292F36] rounded-md">
              <div className="self-center flex flex-col items-center">
                <img className="w-[15rem]" src={`/products/${rev?.p_id}.jpg`} alt="product image" />
                <label>{rev.title}</label>
              </div>
              
              <div className="userAccountContainer p-2 w-full">
                <p>Username:</p>
                <p>{`${rev?.username}`}</p>
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
      }
    </div>
  )
}