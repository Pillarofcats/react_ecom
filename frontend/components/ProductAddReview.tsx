import React, { useRef, useState } from "react"
import { tReview, tProduct } from "../types/types"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useAppDispatch } from "../redux/hooks/default"
import { addReview } from "../redux/slices/reviewsSlice"
import { getSingleProduct } from "../redux/slices/productsSlice"

export default function ProductAddReview({u_id, product, username,}:{u_id:number|undefined, product:tProduct | null, username:string|undefined}) {
  
  const dispatch = useAppDispatch()

  const [hoverStars, setHoverStars] = useState<number>(0)
  const [stars, setStars] = useState<number>(0)

  const reviewRef = useRef<HTMLTextAreaElement>(null)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!reviewRef.current?.value || !stars || !u_id || !username || !product) return

    const userReview = {} as tReview
    userReview.u_id = u_id
    userReview.p_id = Number(product?.p_id)
    userReview.title = product?.title
    userReview.username = username
    userReview.review = reviewRef.current.value
    userReview.stars = stars

    submitReview(userReview)
  }

  async function submitReview(userReview:tReview) {
    try {
      const response = await fetch("http://backend-production-e988.up.railway.app/api/reviews/addreview", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userReview)
      })

      if(response.ok) {
        const data = await response.json()
        dispatch(getSingleProduct(data.p_id))
        dispatch(addReview(data))
      }

    } catch(error) {
      console.log("Failed to add review.")
    }
  }

  function fillStarOnMouseEnter(i:number) {
    setHoverStars(i+1)
  }

  function fillStarOnMouseLeave() {
    if(hoverStars !== 1) return
    setHoverStars(0)
  }

  function starContainerOnMouseLeave() {
    setHoverStars(0)
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full md:w-[50%] p-2">
      <label className="text-2xl" htmlFor="review">Rate and Review</label>

      <div onMouseLeave={() => starContainerOnMouseLeave()} className="flex justify-center gap-2">
        {
          [1,2,3,4,5].map((n,i) => {
            return n <= (hoverStars || Math.abs(hoverStars - stars)) ?
              <AiFillStar onMouseLeave={() => fillStarOnMouseLeave() } onMouseEnter={() => fillStarOnMouseEnter(i) } key={i} size={30} onClick={() => setStars(i+1)} className="fill-amber-300 hover:cursor-pointer" />
              : 
              <AiOutlineStar onMouseEnter={() => setHoverStars(i+1)} key={i} size={30} onClick={() => setStars(i+1)} className="fill-amber-300 hover:cursor-pointer" />
          })
        }
      </div>

      <form className="self-center flex flex-col items-center justify-center gap-4 w-full" onSubmit={ handleFormSubmit }>
        <textarea ref={ reviewRef } className="border-2 border-[#292F36] rounded-md p-2 w-full md:w-[80%]" name="review" id="review" cols={30} rows={5}></textarea>
        <button className="formButton" type="submit">Submit Review</button>
      </form>
    </div>
  )
}
