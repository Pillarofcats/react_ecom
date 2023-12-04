import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import NavbarMobileMenu from "./NavbarMobileMenu";

export default function NavbarMobile() {
  const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);

  return (
    <>
      <button
        className="self-center relative"
        onClick={() => setToggleMobileMenu((state) => !state)}>
        <HiMenu size={31} />
      </button>

      <NavbarMobileMenu
        toggleMobileMenu={toggleMobileMenu}
        setToggleMobileMenu={setToggleMobileMenu}
      />
    </>
  );
}
