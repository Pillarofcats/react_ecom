import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function RootLayout() {
  console.log("ROOOOOTLAYOUT")

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-[4rem] h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </>
  )
}
