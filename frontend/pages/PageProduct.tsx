import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { shallowEqual } from "react-redux"
import { useAppSelector, useAppDispatch } from "../redux/hooks/default"
import { getSingleProduct } from "../redux/slices/productsSlice"
import { getProductReviews } from "../redux/slices/reviewsSlice"

import cookieAuth from "../utility/cookieAuth"

import ProductCard from "../components/ProductCard"
import ProductReviews from "../components/ProductReviews"
import ProductAddReview from "../components/ProductAddReview"

export default function PageProduct() {

  const { pid } = useParams()

  const { dynamicPageProduct } = useAppSelector((state) => state.products, shallowEqual)
  const { user } = useAppSelector((state) => state.user, shallowEqual)
  const { reviews } = useAppSelector((state) => state.reviews, shallowEqual)
  
  const dispatch = useAppDispatch()

  const hasUserMadeReview = reviews.find((review) => review?.u_id === user?.u_id)

  useEffect(() => {
    dispatch(getProductReviews( Number(pid) ))
    dispatch(getSingleProduct( Number(pid) ))
  }, [pid, dispatch])

  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      
      <div className="flex flex-col gap-2 w-full items-center p-2">
        <label className="text-2xl">Product</label>
        { dynamicPageProduct ?
            <ProductCard product={ dynamicPageProduct }/>
            :
            null
        }
      </div>

      <div className="md:flex justify-center">
        { !hasUserMadeReview && cookieAuth() ?
            <ProductAddReview u_id={user?.u_id} product={dynamicPageProduct} username={user?.username} />
            :
            null
        }

        { reviews ? 
            <ProductReviews rev={ reviews } />
            :
            null
        }
      </div>
    </div>
  )
}
