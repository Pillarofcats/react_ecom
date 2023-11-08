import UserCart from "../components/UserCart"

export default function PageCart() {
  console.log("PAGE CART")

  return (
    <div className="flex flex-col flex-1 items-center">
      <UserCart />
    </div>
  )
}
