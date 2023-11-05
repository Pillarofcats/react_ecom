import { AiFillStar } from "react-icons/ai"

export default function ProductsFilter(
  { onChangeStarFilter,
    starFilter
  }
  :
  { onChangeStarFilter:(e:React.ChangeEvent<HTMLInputElement>) => void ,
    starFilter:boolean[]
  }) {

  return (
    <div className="hidden md:block relative p-2">
      <div className="sticky top-[5.25rem] flex flex-col gap-5 w-[10rem] p-2 border-2 border-[#292F36] rounded-md">

        <h1 className="text-xl font-semibold">Product Filter</h1>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Stars</h2>
          {
            [1,2,3,4,5].map((starNumber, index) => {
              return (
                <div key={starNumber} className="flex gap-2 items-center indent-2">
                  <p>{starNumber}</p>
                  <AiFillStar className="fill-amber-300"/>
                  <input type="checkbox" checked={starFilter[index]} name={`${starNumber}`} data-index={index} onChange={ onChangeStarFilter } />
                </div>
              )
            })
          }
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Price</h2>

          <div className="grid grid-cols-3 ml-2">
            <input type="number" placeholder="$" />
            <p>to</p>
            <input type="number" placeholder="$" />
          </div>

        </div>

      </div> 
    </div>
  )
}
