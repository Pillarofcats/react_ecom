import { useNavigate } from "react-router-dom"

type tPagination = {
  currentPage: number,
  numPages: number
}

export default function Pagination({ currentPage, numPages }:tPagination) {

  const navigate = useNavigate()

  const pageNumbers = Array.from({ length: numPages }, (_, ind) => ind+1)

  function backButton() {
    if(currentPage === 1) return
    navigate(`/?page=${currentPage-1}`)
  }

  function forwardButton() { 
    if(currentPage === numPages) return
    navigate(`/?page=${currentPage+1}`)
  }

  return (
    <div className='flex flex-wrap justify-evenly w-[50%]'>
      <button onClick={ backButton }>Back</button>
      { 
        pageNumbers.map((n, i) => {
          return <p key={i} 
                    onClick={()=> { navigate(`/?page=${n}`) }}
                    className={`${ n === currentPage ? "font-bold text-orange-400" : ""}`}>{ n }
                  </p>
        })
      }
      <button onClick={ forwardButton }>Forward</button>
    </div>
  )
}
