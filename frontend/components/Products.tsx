import { useMemo, useState } from "react"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../redux/hooks/default"
import useURLParams from "../hooks/useURLParams"
import { useNavigate } from "react-router"

import Product from "../components/Product"
import ProductsFilter from "./ProductsFilter"
import Pagination from "../components/Pagination"

export default function Products() {

  const navigate = useNavigate()
  const { products } = useAppSelector( (state) => state.products, shallowEqual)
  const { currentPage, queryParams } = useURLParams()

  const pageRange = 10
  const pagePointerStart = (currentPage * pageRange) - pageRange
  const pagePointerEnd = currentPage * pageRange
  

  function setInitalStarFilter() {
    const starsURLParam = queryParams.get("stars")
    const parsedStarFilterURLParam = starsURLParam?.split("")

    const initalStarFilter = [false, false, false, false, false]

    if(!parsedStarFilterURLParam) return initalStarFilter

    for(let i=0; i < parsedStarFilterURLParam.length; i++) {
      const zeroBaseIndex = Number(parsedStarFilterURLParam[i])-1
      initalStarFilter[zeroBaseIndex] = true
    }
    return initalStarFilter
  }

  const [starFilter, setStarFilter] = useState<boolean[]>(setInitalStarFilter)

// const [minMaxPriceFilter, setMinMaxPriceFilter] = useState<[number, number]>([0,0])
// console.log("starFilter", starFilter)

  function onChangeStarFilter(e:React.ChangeEvent<HTMLInputElement>) {

    const updatedStarFilter = [...starFilter]

    if(e.target.checked) {
      updatedStarFilter[Number(e.target.dataset.index)] = true
    } else {
      //Unchecked
      updatedStarFilter[Number(e.target.dataset.index)] = false
      //Last unchecked case
      if(updatedStarFilter.indexOf(true) === -1) {
        setStarFilter(updatedStarFilter)
        queryParams.set("stars", "")
        navigate({ pathname:"/products", search: queryParams.toString() }, { replace: true })
        return
      }
    }
    
    setStarFilter(updatedStarFilter)
    //Set URL params
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

  const filterProductsCurrentPage = useMemo(() => {
    if(starFilter.find((bool) => bool === true)) {
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
