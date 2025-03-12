import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setIsPathname, setIsScroll } from "../../../redux/slices/sidebarSlice";
export function NavbarDashboard() {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  // console.log({ pathname });

  // redux
  const dispatch = useDispatch();

  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
    dispatch(setIsScroll(window.scrollY > 300));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHamburgerActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[9999] bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      } dark:bg-gray-800`}
    >
      <div className="container mx-auto px-6 py-4 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              className="h-16 w-auto sm:h-12" // Ukuran logo diperbesar
              src="/public/images/logo-bpk.svg"
              alt="Logo"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-200 md:text-lg">
              Balai Pelestarian Kebudayaan Wilayah XVIII
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400"
              onClick={handleHamburgerClick}
              aria-label="toggle menu"
            >
              <svg
                className={`h-6 w-6 ${isHamburgerActive ? "hidden" : "block"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isHamburgerActive ? "block" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 text-sm font-semibold transition-all duration-300 ease-in-out dark:bg-gray-800 sm:text-base ${
            isHamburgerActive ? "block" : "hidden"
          } md:ps-24 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100`}
        >
          <div className="flex flex-col lg:mx-6 lg:flex-row">
            <ListNav to={"/"} pathname={pathname}>
              Beranda
            </ListNav>
            <ListNav to={"/persebaran"} pathname={pathname}>
              Persebaran
            </ListNav>
            <ListNav to={"/artikel"} pathname={pathname}>
              Artikel
            </ListNav>
            <ListNav to={"/kegiatan"} pathname={pathname}>
              Kegiatan
            </ListNav>
            <ListNav to={"/feedback"} pathname={pathname}>
              Umpan Balik
            </ListNav>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListNav = ({ children, to, pathname = "" }) => {
  return (
    <Link
      className={`my-2 transform border-b-2 text-gray-700 transition-all duration-300 hover:border-primary hover:text-primary md:w-fit lg:mx-4 lg:my-0 ${pathname === to ? "border-b-primary text-primary" : "border-b-white"}`}
      to={to}
    >
      {children}
    </Link>
  );
};
