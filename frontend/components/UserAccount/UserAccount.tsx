import { Navigate } from "react-router-dom";
import cookieAuth from "../../utility/cookieAuth";

import UserAccountInfo from "../UserAccount/UserAccountInfo";
import UserAccountReviews from "../UserAccount/UserAccountReviews";
import UserAccountPurchases from "../UserAccount/UserAccountPurchases";

export default function UserAccount() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-evenly items-center gap-5 w-full">
      {cookieAuth() ? (
        <>
          <UserAccountInfo />
          <UserAccountReviews />
          <UserAccountPurchases />
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
}
