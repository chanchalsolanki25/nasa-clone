import React, { useState, useEffect } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle((toggle) => !toggle);
  };
  const [width, setWidth] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavLinks = () => {
    if (width < 768) {
      setIsToggle(false);
    }
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 md:flex block justify-between md:items-center text-white md:py-3 py-0 lg:px-20 md:px-12 px-0 md:h-[5rem] h-auto box-content bg-black">
      {/*Toggle button */}
      <div
        className="md:hidden flex items-center justify-between w-full md:p-0 p-3"
      >
        {width < 768 ? <Logo /> : undefined}
        <GiHamburgerMenu
          className={`${isToggle ? "hidden" : "inline"} text-2xl`}
          onClick={handleToggle}
        />
        <GiCancel className={`${isToggle ? "inline" : "hidden"} text-2xl`} onClick={handleToggle} />
      </div>
      {/* Logo */}
      {width >= 768 ? <Logo /> : undefined}
      {/* Nav menus */}
      <ul
        className={`text-slate-200 flex md:flex-row flex-col md:space-x-6 space-y-3 md:py-auto  font-['Outfit'] md:text-xl box-content md:mx-0 mx-1 md:px-0 px-2 md:space-y-0 nav-items ${
          isToggle ? "responsive-nav block" : undefined
        }`}
      >
        <Link to='/'><li className=" hover:text-slate-400 nav-link" onClick={handleNavLinks}>Home</li></Link>
        <Link to='/apod'><li className=" hover:text-slate-400 nav-link" onClick={handleNavLinks}>APOD</li></Link>
        <Link to='/mars-rover'><li className="hover:text-slate-400 nav-link" onClick={handleNavLinks}>Mars Rover</li></Link>
        <Link to='/asteroids'><li className="hover:text-slate-400 nav-link" onClick={handleNavLinks}>Asteroids</li></Link>
         <Link to='/earth-image'><li className="hover:text-slate-400 nav-link" onClick={handleNavLinks}>Earth Image</li></Link>
      </ul>
    </nav>
  );
}

export default Navbar;
