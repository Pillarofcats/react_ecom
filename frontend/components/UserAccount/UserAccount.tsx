import { Navigate } from "react-router-dom"
import cookieAuth from "../../utility/cookieAuth"

import UserAccountInfo from "../UserAccount/UserAccountInfo"
import UserAccountReviews from "../UserAccount/UserAccountReviews"

export default function UserAccount() {

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-evenly items-center gap-5 w-full">
      {
        cookieAuth() ?
          <>
            <UserAccountInfo />
            <UserAccountReviews />
            {/*UserAccountPurchases => getUserPurchases() */}
          </>
          :
          <Navigate to="/sign-in"/>
      }
    </div>
  )
}
