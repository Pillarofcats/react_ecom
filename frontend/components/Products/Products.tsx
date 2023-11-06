import { useMemo, useState } from "react"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../../redux/hooks/default"
import useURLParams from "../../hooks/useURLParams"
import { useNavigate } from "react-router"

import Product from "../Product"
import ProductsFilter from "../ProductsFilter"
import Pagination from "../Pagination"

import setInitalStarFilter from "./functions/setInitialStarFilter"

export default function Products() {

  const navigate = useNavigate()
  const { products } = useAppSelector( (state) => state.products, shallowEqual)
  const { currentPage, currentStars, queryParams } = useURLParams()

  const [starFilter, setStarFilter] = useState<boolean[]>(() => setInitalStarFilter(currentStars))

  // const [minMaxPriceFilter, setMinMaxPriceFilter] = useState<[number, number]>([0,0])

  function onChangeStarFilter(e:React.ChangeEvent<HTMLInputElement>) {

    const updatedStarFilter = [...starFilter]

    if(e.target.checked) {
      updatedStarFilter[Number(e.target.dataset.index)] = true
    } else {
      updatedStarFilter[Number(e.target.dataset.index)] = false
    }
    
    setStarFilter(updatedStarFilter)

    //Set URL param for starFilter
    let starsQueryString = ""

    for(let i=0; i < updatedStarFilter.length; i++) {
      if(updatedStarFilter[i] === true) starsQueryString = starsQueryString.concat(`${i+1}`)
    }

    queryParams.set("stars", starsQueryString)
    navigate({ pathname:"/products", search: queryParams.toString() }, { replace: true })
  }

// function onChangePriceFilter() {

// }

  const productsByStars = useMemo(() => { 
    return products.filter((product) => {
      if(starFilter[0] && product.stars === 1) return true
      if(starFilter[1] && product.stars === 2) return true
      if(starFilter[2] && product.stars === 3) return true
      if(starFilter[3] && product.stars === 4) return true
      if(starFilter[4] && product.stars === 5) return true
    }).sort((a,b) => b.stars - a.stars)

  }, [starFilter, products])


  const pageRange = 10
  const pagePointerStart = (currentPage * pageRange) - pageRange
  const pagePointerEnd = currentPage * pageRange

  const filterProductsCurrentPage = useMemo(() => {
    if(starFilter.some((bool:boolean) => bool === true)) {
      return productsByStars.slice(pagePointerStart, pagePointerEnd)
    } else {
      return products.slice(pagePointerStart, pagePointerEnd)
    }
  }, [products, productsByStars, starFilter, pagePointerStart, pagePointerEnd])

  const numPages = useMemo(() => Math.ceil(products.length / pageRange), [products.length])

  return (
    <>
      <div className="flex flex-1 w-full">
        <ProductsFilter 
          starFilter={starFilter}
          onChangeStarFilter={onChangeStarFilter} />
        <div className="productsContainer flex-1">
          { filterProductsCurrentPage ?
              filterProductsCurrentPage?.map((product) => <Product key={ product.p_id } product={ product }/>)
              :
              null
          }
        </div>
      </div>
      <Pagination numPages={ numPages }/>
    </>
  )
}
