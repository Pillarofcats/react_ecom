import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function useURLParams() {
  
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  // console.log("prodcutsQParams", queryParams)
  const currentPage = Number(queryParams.get("page")) || 1
  // console.log("productCurrentPage", currentPage)
  const currentType = queryParams.get("type") || "all"
  // console.log("productCurrentType", currentType)

  useEffect(() => {
    // console.log('set qparams', queryParams.toString())
    navigate({ search: `page=${currentPage}&type=${currentType}` })
  }, [])

  return {
    currentPage,
    currentType,
    queryParams
  }
}
