import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export default function ProductStars({stars}:{ stars:number}) {

  return (
    <div className="flex">
      {
        [1,2,3,4,5].map((n,i) => {
          return n <= stars ? 
            <div key={i}><AiFillStar size={20} className="fill-amber-300" /></div>
            : 
            <div key={i}><AiOutlineStar size={20} className="fill-amber-300" /></div> 
        })
      }
    </div>
  )
}
