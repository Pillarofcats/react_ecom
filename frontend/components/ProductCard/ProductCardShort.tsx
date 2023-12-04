import ProductImage from "../Product/ProductImage";
import ProductTitle from "../Product/ProductTitle";
import ProductStars from "../Product/ProductStars";
import ProductPrice from "../Product/ProductPrice";

import { tProduct } from "../../types/types";
//border-2 rounded-md border-[#292F36]
export default function ProductCardShort({ product }: { product: tProduct }) {
  return (
    <div className="flex flex-col items-center border shadow-md rounded-sm overflow-hidden gap-1 pb-1">
      <ProductImage
        src={`/products/${product.p_id}.jpg`}
        alt={product.title}
      />
      <ProductTitle title={product.title} />
      <ProductStars stars={product.stars} />
      <p className={product.num_reviews ? "" : "invisible"}>
        ({product.num_reviews ? `${product.num_reviews}` : 0}) Reviews
      </p>
      <ProductPrice price={product.price_cent} />
    </div>
  );
}
