import UserAccount from "../components/UserAccount"
import useRemoveURLParams from "../hooks/useRemoveURLParams"

export default function PageUserAccount() {
  useRemoveURLParams()

  return (
    <div className="flex items-center justify-center flex-1">
      <UserAccount />
    </div>
  )
}
