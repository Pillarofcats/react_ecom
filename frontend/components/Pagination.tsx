import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import useURLParams from "../hooks/useURLParams"

export default function Pagination({ numPages }:{ numPages: number }) {
  console.log("Render Pagination")

  const navigate = useNavigate()
  const { currentPage, queryParams } = useURLParams()

  const pageNumbers = useMemo(() => Array.from({ length: numPages }, (_, ind) => ind+1), [numPages])

  function backButton() {
    if(currentPage === 1) return
    queryParams.set("page", `${currentPage-1}`)
    navigate({ search: queryParams.toString() })
  }

  function pageClick(n:number) {
    queryParams.set("page", `${n}`)
    navigate({ search: queryParams.toString() }) 
  }

  function nextButton() { 
    if(currentPage === numPages) return
    queryParams.set("page", `${currentPage+1}`)
    navigate({ search: queryParams.toString() })
  }

  return (
    <div className='flex flex-wrap justify-evenly w-[50%]'>
      <button onClick={ backButton }>Back</button>
      { 
        pageNumbers.map((n, i) => {
          return <button key={i} 
                    onClick={() => pageClick(n)} 
                    className={`${ n === currentPage ? "font-bold text-orange-400" : ""}`}>{ n }
                </button>
        })
      }
      <button onClick={ nextButton }>Next</button>
    </div>
  )
}
