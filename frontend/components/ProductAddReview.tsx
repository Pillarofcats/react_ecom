import React, { useRef, useState } from "react"
import { tReview } from "../types/types"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { useAppDispatch } from "../redux/hooks/default"
import { addReview } from "../redux/slices/reviewsSlice"
import { getSingleProduct } from "../redux/slices/productsSlice"

export default function ProductAddReview({u_id, p_id, username,}:{u_id:number|undefined, p_id:string|undefined, username:string|undefined}) {

  console.log("review props:", u_id, p_id, username)
  const dispatch = useAppDispatch()

  const [hoverStars, setHoverStars] = useState<number>(0)
  console.log("hover stars", hoverStars)

  const [stars, setStars] = useState<number>(0)
  console.log("stars", stars)
  const reviewRef = useRef<HTMLTextAreaElement>(null)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!reviewRef.current?.value || !stars || !u_id || !username) return

    const userReview = {} as tReview
    userReview.u_id = u_id
    userReview.p_id = Number(p_id)
    userReview.username = username
    userReview.review = reviewRef.current.value
    userReview.stars = stars

    submitReview(userReview)
  }

  async function submitReview(userReview:tReview) {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/addreview", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userReview)
      })
      const data = await response.json()
      console.log("added Review", data)

      dispatch(getSingleProduct( data.p_id ))
      dispatch(addReview(data))
    } catch(error) {
      console.error("Submit review error", error)
    }
  }

  function fillStarOnMouseEnter(i:number) {
    // if(hoverStars <= stars) setHoverStars(0)
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
