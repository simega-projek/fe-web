import { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setIsScroll } from "../../../redux/slices/sidebarSlice";

export function NavbarDashboard() {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isInformationDropdownOpen, setIsInformationDropdownOpen] =
    useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
    dispatch(setIsScroll(window.scrollY > 300));
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsServiceDropdownOpen(false); // Close feedback dropdown if open
    setIsInformationDropdownOpen(false); // Close feedback dropdown if open
  };

  const toggleFeedbackDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
    setIsProfileDropdownOpen(false);
    setIsInformationDropdownOpen(false); // Close feedback dropdown if open
    // Close profile dropdown if open
  };
  const toggleInformationDropdown = () => {
    setIsInformationDropdownOpen(!isInformationDropdownOpen); // Close feedback dropdown if open

    setIsServiceDropdownOpen(false);
    setIsProfileDropdownOpen(false); // Close profile dropdown if open
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHamburgerActive(false);
        setIsProfileDropdownOpen(false);
        setIsServiceDropdownOpen(false);
        setIsInformationDropdownOpen(false); // Close feedback dropdown if open
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
      className={`fixed left-0 right-0 top-0 z-[9999] bg-primary transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      } dark:bg-gray-800`}
    >
      <div className="container mx-auto px-6 py-4 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              className="h-16 w-auto sm:h-12"
              src="/public/images/logo-bpk.svg"
              alt="Logo"
            />
            <span className="ml-2 text-sm font-semibold text-white md:text-lg">
              Balai Pelestarian Kebudayaan Wilayah XVIII
            </span>
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-white hover:text-tan focus:outline-none dark:text-gray-200 dark:hover:text-gray-400"
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

        <div
          className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 text-sm font-semibold transition-all duration-300 ease-in-out dark:bg-gray-800 sm:text-base md:text-base ${
            isHamburgerActive ? "block" : "hidden"
          } md:ps-24 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100`}
          ref={dropdownRef}
        >
          <div className="flex flex-col gap-1 lg:mx-6 lg:flex-row">
            <ListNav to={"/"} pathname={pathname}>
              Beranda
            </ListNav>

            {/* profil */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className={`group flex transform items-center justify-center gap-2 border-b-2 text-primary transition-all duration-300 hover:text-tan md:w-fit lg:mx-4 lg:my-0 lg:text-white hover:lg:border-white ${pathname === "/visi-misi" || pathname === "/struktur-organisasi" || pathname === "/tugas-fungsi" ? "border-b-primary text-primary lg:border-b-white" : "border-b-white lg:border-b-primary"}`}
              >
                <span> Profil </span>{" "}
                {isProfileDropdownOpen ? (
                  <BiSolidUpArrow />
                ) : (
                  <BiSolidDownArrow />
                )}
              </button>
              {isProfileDropdownOpen && (
                <div
                  className={`absolute left-0 z-10 mt-2 w-48 rounded border shadow-lg dark:bg-gray-800 lg:top-11`}
                >
                  <Link
                    to="/visi-misi"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Visi dan Misi
                  </Link>
                  <Link
                    to="struktur-organisasi"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Struktur Organisasi
                  </Link>
                  <Link
                    to="/tugas-fungsi"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Tugas Fungsi
                  </Link>
                </div>
              )}
            </div>

            <ListNav to={"/persebaran"} pathname={pathname}>
              Persebaran
            </ListNav>

            {/* information */}
            <div className="relative">
              <button
                onClick={toggleInformationDropdown}
                className={`mb-1 transform gap-2 border-b-2 text-primary transition-all duration-300 hover:text-tan md:w-fit lg:mx-4 lg:my-0 lg:text-white hover:lg:border-white ${pathname === "/artikel" || pathname === "/kegiatan" ? "border-b-primary text-primary lg:border-b-white" : "border-b-white lg:border-b-primary"} flex items-center justify-center`}
              >
                <span> Informasi </span>{" "}
                {isInformationDropdownOpen ? (
                  <BiSolidUpArrow />
                ) : (
                  <BiSolidDownArrow />
                )}
              </button>

              {isInformationDropdownOpen && (
                <div className="absolute left-0 z-10 mt-2 w-44 rounded border shadow-lg dark:bg-gray-800 lg:top-11">
                  <Link
                    to="/artikel"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Artikel
                  </Link>
                  <Link
                    to="/kegiatan"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Kegiatan
                  </Link>
                </div>
              )}
            </div>

            {/* layanan */}
            <div className="relative">
              <button
                onClick={toggleFeedbackDropdown}
                className={`flex transform items-center justify-center gap-2 border-b-2 text-primary transition-all duration-300 hover:text-tan md:w-fit lg:mx-4 lg:my-0 lg:text-white hover:lg:border-white ${pathname === "/feedback" || pathname === "/pengaduan-masyarakat" || pathname === "/permohonan-izin" ? "border-b-primary text-primary lg:border-b-white" : "border-b-white lg:border-b-primary"}`}
              >
                <span> Layanan </span>{" "}
                {isServiceDropdownOpen ? (
                  <BiSolidUpArrow />
                ) : (
                  <BiSolidDownArrow />
                )}
              </button>
              {isServiceDropdownOpen && (
                <div className="absolute left-0 z-10 mt-2 w-52 rounded border shadow-lg dark:bg-gray-800 lg:-left-16 lg:top-11">
                  <Link
                    to="/feedback"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Umpan Balik
                  </Link>
                  <Link
                    to="/pengaduan-masyarakat"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Pengaduan Masyarakat
                  </Link>
                  <Link
                    to="/permohonan-izin"
                    className="block bg-primary px-4 py-2 text-sm text-white hover:bg-tan md:text-base"
                  >
                    Permohonan Izin
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListNav = ({ children, to, pathname = "" }) => {
  return (
    <Link
      className={`my-2 transform border-b-2 text-sm text-primary transition-all duration-300 hover:text-tan md:w-fit md:text-base lg:mx-4 lg:my-0 lg:text-white hover:lg:border-white ${pathname === to ? "border-b-primary text-primary lg:border-b-white" : "border-b-white lg:border-b-primary"}`}
      to={to}
    >
      {children}
    </Link>
  );
};
