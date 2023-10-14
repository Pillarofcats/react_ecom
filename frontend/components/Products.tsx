import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

import Product from "../components/Product"
import Pagination from "../components/Pagination"

type tProduct = {
  p_id: string,
  title: string,
  description: string,
  price_cent: number,
  weight_lbs: number,
  product_type: string,
  quantity: number,
  quantity_sold?: number | null,
  stars: number
}

export default function Products() {

  // const mockProducts = useMemo(() => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27], [])
  const navigate = useNavigate()

  const [products, setProducts] = useState<tProduct[]>([])
  const [pageParam] = useSearchParams({ page:`${1}` })

  const currentPage = useMemo(() => Number(pageParam.get("page")), [pageParam])
  const pageRange = 4
  const numPages = useMemo(() => Math.ceil(products.length / pageRange), [products.length])
  const pagePointerStart = currentPage * pageRange - pageRange
  const pagePointerEnd = currentPage * pageRange

  const filterProductsCurrentPage = useMemo(() => products?.slice(pagePointerStart, pagePointerEnd), [products, pagePointerStart, pagePointerEnd])

  async function getAllProducts() {
    const data = await fetch("http://localhost:5000/api/products/allproducts")
    const response = await data.json()
    setProducts(response)
  } 

  useEffect(() => {
    getAllProducts()
    // setProductId(mockProducts)
  }, [])

  useEffect(() => {
    navigate(`/?page=${currentPage}`)

  }, [currentPage, navigate, pageParam, numPages])
  
  return (
    <>
      <div className="productsContainer flex-1">
        { filterProductsCurrentPage?.map((product, index) => <Product key={ index } product={ product }/>) }
      </div>

      <Pagination currentPage={ currentPage } numPages={ numPages }/>
    </>
  )
}
