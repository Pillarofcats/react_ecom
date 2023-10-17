import NavItemLogo from "./NavItemLogo"
import NavItemSearch from "./NavItemSearch"
import NavItemPageLinks from "./NavItemPageLinks"
import NavItemCart from "./NavItemCart"

export default function Navbar() {
  console.log("Render Navbar")
  return (
    <>
      <nav className="flex justify-between sticky top-0 bg-slate-800 px-5 w-full h-16 text-white">
        <NavItemLogo />
        <NavItemSearch />
        <NavItemPageLinks />
        <NavItemCart />
      </nav>
    </>
  )
}