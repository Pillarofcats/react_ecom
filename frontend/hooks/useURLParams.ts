import { useLocation } from "react-router-dom";

export default function useURLParams() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentSearch = queryParams.get("search") || "";
  const currentPage = Number(queryParams.get("page")) || 1;
  const currentType = queryParams.get("type") || "all";
  const currentStars = queryParams.get("stars") || "";
  const currentMinPrice = queryParams.get("pmin") || "";
  const currentMaxPrice = queryParams.get("pmax") || "";

  return {
    currentMinPrice,
    currentMaxPrice,
    currentStars,
    currentSearch,
    currentPage,
    currentType,
    queryParams,
  };
}
