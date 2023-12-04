import { tProduct } from "../../types/types";

export default function ProductCardLocalSearch({
  product,
}: {
  product: tProduct;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <img
        className="w-[5rem]"
        src={`/products/${product.p_id}.jpg`}
        alt={product.title}
      />
      <label className="text-md">{product.title}</label>
    </div>
  );
}
