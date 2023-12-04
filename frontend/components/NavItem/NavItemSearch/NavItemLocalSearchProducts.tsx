import { tProduct } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import ProductCardLocalSearch from "../../ProductCard/ProductCardLocalSearch";

export default function NavLocalSearchProducts({
  filteredLocalSearchProducts,
}: {
  filteredLocalSearchProducts: tProduct[];
}) {
  const navigate = useNavigate();

  if (filteredLocalSearchProducts.length === 0) return null;

  return (
    <div className="absolute top-[2rem] left-0 flex flex-col gap-1 text-black bg-white p-3 border rounded-b-sm">
      {filteredLocalSearchProducts.map((product) => {
        return (
          <button
            type="button"
            key={product.p_id}
            onClick={() => navigate({ pathname: `/products/${product.p_id}` })}>
            <ProductCardLocalSearch product={product} />
          </button>
        );
      })}
    </div>
  );
}
