import { AiFillStar } from "react-icons/ai"

export default function ProductsFilter() {
  return (
    <div className="hidden md:block relative p-2">
      <div className="sticky top-[5.25rem] flex flex-col gap-5 w-[10rem] p-2 border-2 border-[#292F36] rounded-md">

        <h1 className="text-xl font-semibold">Product Filter</h1>

        <div className="flex flex-col">
          <h2 className="text-xl">Stars</h2>

          <div className="flex gap-2  items-center indent-2">
            <p>1</p>
            <AiFillStar className="fill-amber-300"/>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2 items-center indent-2 ">
            <p>2</p>
            <AiFillStar className="fill-amber-300"/>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2 items-center indent-2 ">
            <p>3</p>
            <AiFillStar className="fill-amber-300"/>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2 items-center indent-2 ">
            <p>4</p>
            <AiFillStar className="fill-amber-300"/>
            <input type="checkbox" />
          </div>
          <div className="flex gap-2 items-center indent-2 ">
            <p>5</p>
            <AiFillStar className="fill-amber-300"/>
            <input type="checkbox" />
          </div>

        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Price</h2>

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
