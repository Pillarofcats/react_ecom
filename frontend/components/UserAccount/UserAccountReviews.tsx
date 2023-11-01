import { useAppDispatch, useAppSelector } from "../../redux/hooks/default"
import UserProductReviews from "../UserAccount/UserProductReviews"
import { useEffect } from "react"
import { getUserReviews } from "../../redux/slices/userSlice"

export default function UserAccountReviews() {
  const user = useAppSelector((state) => state.user)
  const u_id = user.user?.u_id
  const userReviews = user.reviews
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(u_id) dispatch(getUserReviews(u_id))

  }, [u_id, dispatch, user.user?.username])

  return (
    <>
      { userReviews ?
        <UserProductReviews rev={userReviews} />
        :
        null
      }
    </>
  )
}
