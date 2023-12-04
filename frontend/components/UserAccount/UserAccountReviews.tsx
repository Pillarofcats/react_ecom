import { useAppSelector } from "../../redux/hooks/default";
import UserAccountProductReviews from "./UserAccountProductReviews";

export default function UserAccountReviews() {
  const user = useAppSelector((state) => state.user);
  const userReviews = user.reviews;

  return (
    <>{userReviews ? <UserAccountProductReviews rev={userReviews} /> : null}</>
  );
}
