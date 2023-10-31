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
  
  // const filteredProductsBySearch = useMemo(() => products.filter((product) => product.title.toLowerCase().includes(currentSearch.toLowerCase())), [products, currentSearch])

  const filterProductsCurrentPage = useMemo(() => products.slice(pagePointerStart, pagePointerEnd), [products, pagePointerStart, pagePointerEnd])

  const numPages = useMemo(() => Math.ceil(products.length / pageRange), [products.length])

  return (
    <>
      <div className="productsContainer flex-1">
        { filterProductsCurrentPage ?
            filterProductsCurrentPage?.map((product) => <Product key={ product.p_id } product={ product }/>)
            :
            null
        }
      </div>
      <Pagination numPages={ numPages }/>
    </>
  )
}
