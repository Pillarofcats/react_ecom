import NavItemLogo from "../NavItem/NavItemLogo";
import NavItemSearch from "../NavItem/NavItemSearch/NavItemSearch";
import NavItemPageLinks from "../NavItem/NavItemPageLinks";
import NavItemCart from "../NavItem/NavItemCart";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 hidden md:flex justify-between min-w-full bg-[#292F36] h-16 text-white gap-5 px-5 z-50">
        <NavItemLogo />
        <NavItemSearch />
        <NavItemPageLinks />
        <NavItemCart />
      </nav>

      <nav className="fixed md:hidden top-0 flex justify-between min-w-full bg-[#292F36] h-16 text-white gap-5 px-5 z-50">
        <NavItemLogo />
        <NavbarMobile />
      </nav>
    </>
  );
}
