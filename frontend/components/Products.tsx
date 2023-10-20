import { useEffect, useMemo } from "react"
// import { useNavigate } from "react-router-dom"

import { shallowEqual } from "react-redux"
import { useAppSelector, useAppDispatch } from "../redux/hooks/default"
import { getProducts } from "../redux/slices/productsSlice"

import { tType } from "../../backend/types/types"

import useURLParams from "../hooks/useURLParams"

import Product from "../components/Product"
import Pagination from "../components/Pagination"

export default function Products() {
  console.log("Render Products")

  const { products } = useAppSelector( (state) => state.products, shallowEqual)
  const dispatch = useAppDispatch()

  const { currentPage, currentType } = useURLParams()

  const pageRange = 8
  const pagePointerStart = (currentPage * pageRange) - pageRange
  const pagePointerEnd = currentPage * pageRange

  const numPages = useMemo(() => Math.ceil(products.length / pageRange), [products.length])
  const filterProductsCurrentPage = useMemo(() => products.slice(pagePointerStart, pagePointerEnd), [products, pagePointerStart, pagePointerEnd])

  useEffect(() => {
    if(!currentType) return
    dispatch(getProducts(currentType as tType))
  }, [currentType, dispatch])

  return (
    <>
      <div className="productsContainer flex-1">
        { filterProductsCurrentPage?.map((product, index) => <Product key={ index } product={ product }/>) }
      </div>
      <Pagination numPages={ numPages }/>
    </>
  )
}
