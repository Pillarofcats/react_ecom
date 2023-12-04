import NavItemLogo from "../NavItem/NavItemLogo";
import NavItemSearch from "../NavItem/NavItemSearch/NavItemSearch";
import NavItemPageLinks from "../NavItem/NavItemPageLinks";
import NavItemCart from "../NavItem/NavItemCart";

import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NavbarMobileMenu({
  toggleMobileMenu,
  setToggleMobileMenu,
}: {
  toggleMobileMenu: boolean;
  setToggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();

  useEffect(() => {
    if (toggleMobileMenu) setToggleMobileMenu(false);
  }, [location.pathname]);

  return (
    <div
      className={`fixed top-0 left-0 bg-[#292F36] w-full h-full ease-in-out duration-300 ${
        toggleMobileMenu ? "translate-x-0" : "translate-x-full"
      }`}>
      <button
        className="fixed right-0 mt-[1.2rem] mr-[1.2rem]"
        onClick={() => setToggleMobileMenu((state) => !state)}>
        <IoClose size={33} />
      </button>

      <div className="h-full flex flex-col gap-10 p-5 justify-center">
        <button
          className="w-fit self-center"
          onClick={() => setToggleMobileMenu(false)}>
          <NavItemLogo />
        </button>

        <NavItemSearch />

        <button
          className="w-fit self-center"
          onClick={() => setToggleMobileMenu(false)}>
          <NavItemPageLinks />
        </button>
        <button
          className="w-fit self-center"
          onClick={() => setToggleMobileMenu(false)}>
          <NavItemCart />
        </button>
      </div>
    </div>
  );
}
