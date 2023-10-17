
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

export default function useRemoveURLParams() {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: "",
    })
  }, [])
}
