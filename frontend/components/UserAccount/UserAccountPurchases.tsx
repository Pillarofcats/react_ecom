import { useAppSelector } from "../../redux/hooks/default"
import UserProductPurchases from "../UserAccount/UserProductPurchases"

export default function UserAccountPurchases() {

  const user = useAppSelector((state) => state.user)
  const userPurchases = user.purchased

  return (
    <>
      { userPurchases ?
        <UserProductPurchases purchases={userPurchases} />
        :
        null
      }
    </>
  )
}
