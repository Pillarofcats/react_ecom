import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import ProductReviews from "../components/ProductReviews"

import { useParams } from "react-router-dom"

import { shallowEqual } from "react-redux"
import { useAppSelector, useAppDispatch } from "../redux/hooks/default"

import { getSingleProduct } from "../redux/slices/productsSlice"

export default function PageProduct() {
  const { pid } = useParams()
  console.log("id", pid)

  const { dynamicPageProduct } = useAppSelector((state) => state.products, shallowEqual)
  const dispatch = useAppDispatch()

  const currentProduct = dynamicPageProduct
  console.log("currentProduct", currentProduct)

  useEffect(() => {
    console.log("Product Page #")
    dispatch(getSingleProduct( Number(pid) ))
  }, [])

  const MOCKREVIEWS = [{r: "Review 1"}, {r: "Review 2"}, {r: "Review 3"}, {r: "Review 4"}]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col w-full items-center py-12">
        { currentProduct ?
            <ProductCard product={ currentProduct }/>
            :
            null
        }
      </div>

      <ProductReviews reviews={ MOCKREVIEWS } />
    </div>
  )
}
