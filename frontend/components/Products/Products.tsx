import { useCallback, useMemo, useState } from "react"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../../redux/hooks/default"
import useURLParams from "../../hooks/useURLParams"
import { useNavigate } from "react-router"
import { tProduct } from "../../types/types"

import Product from "../Product"
import ProductsFilter from "./ProductsFilter"
import Pagination from "../Pagination"

import setInitalStarFilter from "./functions/setInitialStarFilter"

export default function Products() {

  const navigate = useNavigate()
  const { products } = useAppSelector( (state) => state.products, shallowEqual)
  const { currentPage, currentStars, currentMinPrice, currentMaxPrice, queryParams } = useURLParams()

  const [starFilter, setStarFilter] = useState<boolean[]>(() => setInitalStarFilter(currentStars))

  const [minPriceFilter, setMinPriceFilter] = useState<string>(currentMinPrice)
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>(currentMaxPrice)
  const [submitPriceForm, setSubmitPriceForm] = useState<boolean>(false)


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

  function onChangePriceFilter(e:React.ChangeEvent<HTMLInputElement>) {
    if(/[^0-9]/.test(e.target.value)) return

    if(e.target.name === "minPrice") {
      setMinPriceFilter(e.target.value)
      queryParams.set("pmin", e.target.value)
    }
    if(e.target.name === "maxPrice")  {
      setMaxPriceFilter(e.target.value)
      queryParams.set("pmax", e.target.value)
    }

    navigate({ pathname:"/products", search: queryParams.toString() }, { replace: true })
  }

  const productsByStars = useCallback((array:tProduct[]) => { 
    return array.filter((product) => {
      if(starFilter[0] && product.stars === 1) return true
      if(starFilter[1] && product.stars === 2) return true
      if(starFilter[2] && product.stars === 3) return true
      if(starFilter[3] && product.stars === 4) return true
      if(starFilter[4] && product.stars === 5) return true
    }).sort((a,b) => b.stars - a.stars)

  }, [starFilter])

  const productsByPrice = useCallback((array:tProduct[]) => {

    return array.filter((product) => {
      
      const productPrice = (product.price_cent * .01)

      if(minPriceFilter && maxPriceFilter) {
        return (productPrice >= Number(minPriceFilter) && productPrice <= Number(maxPriceFilter))
      }
      if(minPriceFilter && !maxPriceFilter) {
        return (productPrice >= Number(minPriceFilter))
      }
      if(!minPriceFilter && maxPriceFilter) {
        return (productPrice <= Number(maxPriceFilter))
      }
    })
    .sort((a,b) => a.price_cent - b.price_cent)

  }, [minPriceFilter, maxPriceFilter])


  const filteredProducts = useMemo(() => {
    let cpyProducts = [...products]

    if(starFilter.some((bool:boolean) => bool === true)) {
      cpyProducts = productsByStars(cpyProducts)
    }
    if(submitPriceForm) {
      cpyProducts = productsByPrice(cpyProducts)
    }

    return cpyProducts
  }, [starFilter, products, submitPriceForm, productsByPrice, productsByStars])

  //Pagination
  const pageRange = 10
  const pagePointerStart = (currentPage * pageRange) - pageRange
  const pagePointerEnd = currentPage * pageRange

  const filterProductsCurrentPage = useMemo(() => filteredProducts.slice(pagePointerStart, pagePointerEnd), [filteredProducts, pagePointerStart, pagePointerEnd])

  const numPages = useMemo(() => Math.ceil(products.length / pageRange), [products.length])

  return (
    <>
      <div className="flex flex-1 w-full">
        <ProductsFilter 
          starFilter={starFilter}
          onChangeStarFilter={onChangeStarFilter} 
          minPriceFilter={minPriceFilter}
          setMinPriceFilter={setMinPriceFilter}
          maxPriceFilter={maxPriceFilter}
          setMaxPriceFilter={setMaxPriceFilter}
          setSubmitPriceForm={setSubmitPriceForm}
          onChangePriceFilter={onChangePriceFilter}
          />
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
