import NavItemLogo from "./NavItemLogo"
import NavItemSearch from "./NavItemSearch/NavItemSearch"
import NavItemPageLinks from "./NavItemPageLinks"
import NavItemCart from "./NavItemCart"

export default function Navbar() {
  console.log("Render Navbar")
  return (
    <nav className="fixed top-0 flex justify-between min-w-full bg-[#292F36] h-16 text-white gap-5 px-5 z-50">
      <NavItemLogo />
      <NavItemSearch />
      <NavItemPageLinks />
      <NavItemCart />
    </nav>
  
  )
}