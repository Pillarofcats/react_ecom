import { AiFillStar } from "react-icons/ai"

export default function ProductsFilter(
  { onChangeStarFilter,
    starFilter,
    minPriceFilter,
    setMinPriceFilter,
    maxPriceFilter,
    setMaxPriceFilter,
    setSubmitPriceForm,
    onChangePriceFilter
  }
  :
  { onChangeStarFilter:(e:React.ChangeEvent<HTMLInputElement>) => void ,
    starFilter:boolean[],
    minPriceFilter: string,
    setMinPriceFilter: React.Dispatch<React.SetStateAction<string>>,
    maxPriceFilter: string,
    setMaxPriceFilter: React.Dispatch<React.SetStateAction<string>>,
    setSubmitPriceForm:React.Dispatch<React.SetStateAction<boolean>>,
    onChangePriceFilter:(e:React.ChangeEvent<HTMLInputElement>) => void
  }) {

  // const minPriceRef = useRef<HTMLInputElement>(null)
  // const maxPriceRef = useRef<HTMLInputElement>(null)

  

  // console.log("minRef", minPriceRef)
  // console.log("mexRef", maxPriceRef)

  function handleSubmitPriceFilter(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!minPriceFilter && !maxPriceFilter) return
    
    let minPriceInput
    let maxPriceInput 

    if(minPriceFilter) minPriceInput = Number(minPriceFilter)
    if(maxPriceFilter) maxPriceInput = Number(maxPriceFilter)

    console.log("mininput", minPriceInput)
    console.log("maxinput", maxPriceInput)

    if(minPriceInput && maxPriceInput && minPriceInput >= maxPriceInput) {
      setMaxPriceFilter("")
      console.log("submitted min price range", minPriceInput)
    }
    else if(minPriceInput && maxPriceInput && minPriceInput < maxPriceInput) {
      setMinPriceFilter(`${minPriceInput}`)
      setMaxPriceFilter(`${maxPriceInput}`)
      console.log("submitted price range", minPriceInput, " - ", maxPriceInput)
    }
    else if(!minPriceInput && maxPriceInput) {
      console.log("submitted max price range", maxPriceInput)
      setMaxPriceFilter(`${maxPriceInput}`)
    }
    else if(minPriceInput && !maxPriceInput) {
      setMinPriceFilter(`${minPriceInput}`)
      console.log("submitted min price range", minPriceInput)
    }

    setSubmitPriceForm(true)
  }

  return (
    <div className="hidden md:block relative p-2">
      <div className="sticky top-[5.25rem] flex flex-col gap-3 w-[10rem] p-2 border-2 border-[#292F36] rounded-md">

        <h1 className="text-xl text-center font-semibold">Product Filter</h1>

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

            <form className="flex flex-col" onSubmit={handleSubmitPriceFilter}>
              <div className="grid grid-cols-1 ml-2">
                <p>from:</p>
                <input 
                  className="border border-[#292F36] rounded-md indent-1 w-[calc(100%-.5rem)]"
                  name="minPrice" 
                  onClick={() => setSubmitPriceForm(false)}
                  onFocus={() => setSubmitPriceForm(false)}
                  value={minPriceFilter} 
                  placeholder="$" maxLength={7} 
                  onChange={onChangePriceFilter} />
                <p>to:</p>
                <input 
                  className="border border-[#292F36] rounded-md indent-1 w-[calc(100%-.5rem)]" 
                  name="maxPrice" 
                  onClick={() => setSubmitPriceForm(false)}
                  onFocus={() => setSubmitPriceForm(false)}
                  value={maxPriceFilter} 
                  placeholder="$" maxLength={7}
                  onChange={onChangePriceFilter} />
              </div>
              <button type="submit" className="formButton mt-3">Submit</button>
            </form>

        </div>

      </div> 
    </div>
  )
}
