import Products from "../components/Products/Products"

export default function PageHome() {
  // console.log("PAGE HOME")

  return (
    <div className="flex flex-1 flex-col items-center gap-5 p-5">
      <Products />
    </div>
  )
}