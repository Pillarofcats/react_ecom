import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import ProductReviews from "../components/ProductReviews"
import ProductAddReview from "../components/ProductAddReview"

import { useParams } from "react-router-dom"

import { shallowEqual } from "react-redux"
import { useAppSelector, useAppDispatch } from "../redux/hooks/default"

import { getSingleProduct } from "../redux/slices/productsSlice"
import { getProductReviews } from "../redux/slices/reviewsSlice"

export default function PageProduct() {
  const { pid } = useParams()
  console.log("id", pid)

  const user = useAppSelector((state) => state.user.user, shallowEqual)
  const reviews = useAppSelector((state) => state.reviews)
  const { dynamicPageProduct } = useAppSelector((state) => state.products, shallowEqual)
  const dispatch = useAppDispatch()

  console.log("reviews", reviews.reviews)

  const currentProduct = dynamicPageProduct
  console.log("currentProduct", currentProduct)

  useEffect(() => {
    console.log("Product Page #")
    dispatch(getProductReviews( Number(pid) ))
    dispatch(getSingleProduct( Number(pid) ))
  }, [])


  if(!pid || !user) return null

  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      
      <div className="flex flex-col gap-2 w-full items-center p-2">
        <label className="text-2xl">Product</label>
        { currentProduct ?
            <ProductCard product={ currentProduct }/>
            :
            null
        }
      </div>

      <div className="md:flex">
        <ProductAddReview u_id={user?.u_id} p_id={pid} username={user?.username} />

        { reviews ? 
            <ProductReviews rev={ reviews } />
            :
            null
        }
      </div>
    </div>
  )
}
