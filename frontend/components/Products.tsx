import { useMemo } from "react"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../redux/hooks/default"
import useURLParams from "../hooks/useURLParams"

import Product from "../components/Product"
import Pagination from "../components/Pagination"

export default function Products() {
  console.log("Render Products")

  const { products } = useAppSelector( (state) => state.products, shallowEqual)
  const { currentSearch, currentPage } = useURLParams()

  const pageRange = 10
  const pagePointerStart = (currentPage * pageRange) - pageRange
  const pagePointerEnd = currentPage * pageRange

  console.log("currentSearch", currentSearch)
  
  const filteredProductsBySearch = useMemo(() => products.filter((product) => product.title.toLowerCase().includes(currentSearch.toLowerCase())), [products, currentSearch])

  const filterProductsCurrentPage = useMemo(() => filteredProductsBySearch.slice(pagePointerStart, pagePointerEnd), [filteredProductsBySearch, pagePointerStart, pagePointerEnd])

  const numPages = useMemo(() => Math.ceil(filteredProductsBySearch.length / pageRange), [filteredProductsBySearch.length])

  return (
    <>
      <div className="productsContainer flex-1">
        { filterProductsCurrentPage ?
            filterProductsCurrentPage?.map((product, index) => <Product key={ index } product={ product }/>)
            :
            null
        }
      </div>
      <Pagination numPages={ numPages }/>
    </>
  )
}
