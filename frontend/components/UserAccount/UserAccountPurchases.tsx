import { useAppSelector } from "../../redux/hooks/default";
import UserAccountProductPurchases from "./UserAccountProductPurchases";

export default function UserAccountPurchases() {
  const user = useAppSelector((state) => state.user);
  const userPurchases = user.purchased;

  return (
    <>
      {userPurchases ? (
        <UserAccountProductPurchases purchases={userPurchases} />
      ) : null}
    </>
  );
}
