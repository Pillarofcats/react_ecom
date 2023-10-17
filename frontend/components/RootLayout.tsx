import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </>
  )
}
