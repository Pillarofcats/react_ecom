import { useEffect } from "react"
import { getUserPurchases } from "../../redux/slices/userSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/default"
import UserProductPurchases from "../UserAccount/UserProductPurchases"

export default function UserAccountPurchases() {
  const user = useAppSelector((state) => state.user)
  const u_id = user.user?.u_id
  const userPurchases = user.purchased
  const dispatch = useAppDispatch()
  
  console.log("PURCHASES", userPurchases)

  useEffect(() => {
    if(u_id) dispatch(getUserPurchases(u_id))

  }, [u_id, dispatch, user.user?.username])

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
