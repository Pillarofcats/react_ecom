import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks/default"
import { getUserPurchases, getUserReviews } from "../redux/slices/userSlice"

export default function useAuthUser() {
  
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if(user.user?.u_id) {
      dispatch(getUserPurchases(user.user?.u_id))
      dispatch(getUserReviews(user.user?.u_id))
    }
  }, [dispatch, user.user?.u_id])
}
