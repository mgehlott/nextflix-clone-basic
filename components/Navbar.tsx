import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
const TOP_OFFSET = 66;
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackgroundColor, setShowBackgroundColor] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackgroundColor(true);
      } else {
        setShowBackgroundColor(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };
  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
  };
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row item-center transition duration-500 ${
          showBackgroundColor ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img
          src="/images/logo.png"
          className="h-4 lg:h-7"
          alt="'netflix logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavItem label="Home" />
          <NavItem label="Series" />
          <NavItem label="Films" />
          <NavItem label="New & Popular" />
          <NavItem label="My List" />
          <NavItem label="Browse by language" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer ">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer ">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
