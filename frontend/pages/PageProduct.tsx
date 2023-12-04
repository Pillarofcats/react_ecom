import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux/hooks/default";
import {
  getSingleProduct,
  resetDynamicPageProduct,
} from "../redux/slices/productsSlice";
import { getProductReviews } from "../redux/slices/reviewsSlice";

import cookieAuth from "../utility/cookieAuth";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductReviews from "../components/Product/ProductReviews";
import ProductAddReview from "../components/Product/ProductAddReview";

export default function PageProduct() {
  // console.log("PAGE PRODUCTS")

  const { pid } = useParams();
  const { dynamicPageProduct } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.user, shallowEqual);
  const { reviews } = useAppSelector((state) => state.reviews, shallowEqual);
  const { purchased } = useAppSelector((state) => state.user, shallowEqual);

  const dispatch = useAppDispatch();
  const hasUserPurchasedProduct = purchased?.some(
    (purchase) => purchase?.p_id === pid
  );
  const hasUserMadeReview = reviews?.some(
    (review) => review?.u_id === user?.u_id
  );

  useEffect(() => {
    dispatch(resetDynamicPageProduct());
    dispatch(getProductReviews(Number(pid)));
    dispatch(getSingleProduct(Number(pid)));
  }, [pid, dispatch]);

  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      <div className="flex flex-col gap-2 w-full items-center p-2">
        <label className="text-2xl">Product</label>
        {dynamicPageProduct ? (
          <ProductCard product={dynamicPageProduct} />
        ) : null}
      </div>

      <div className="md:flex justify-center">
        {!hasUserMadeReview && hasUserPurchasedProduct && cookieAuth() ? (
          <ProductAddReview
            u_id={user?.u_id}
            product={dynamicPageProduct}
            username={user?.username}
          />
        ) : null}

        {reviews ? <ProductReviews rev={reviews} /> : null}
      </div>
    </div>
  );
}
