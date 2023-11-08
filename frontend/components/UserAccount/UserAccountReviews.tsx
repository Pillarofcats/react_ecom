import { useAppSelector } from "../../redux/hooks/default"
import UserProductReviews from "../UserAccount/UserProductReviews"

export default function UserAccountReviews() {
  
  const user = useAppSelector((state) => state.user)
  const userReviews = user.reviews

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
