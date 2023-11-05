import { useLocation } from "react-router-dom"

export default function useURLParams() {

  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const currentSearch = queryParams.get("search") || ""
  const currentPage = Number(queryParams.get("page")) || 1
  const currentType = queryParams.get("type") || "all"
  const currentStarFilter = queryParams.get("stars") || ""

  return {
    currentStarFilter,
    currentSearch,
    currentPage,
    currentType,
    queryParams
  }
}
