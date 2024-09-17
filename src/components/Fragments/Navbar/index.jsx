import { useState } from "react";
import { Link } from "react-router-dom";
export function NavbarDashboard() {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };
  const handleDropdownClick = () => {
    setIsDropdownMenu(!isDropdownMenu);
  };
  return (
    <header className="text-poppins fixed left-0 top-0 z-[999] flex w-full items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between py-2 lg:py-0">
          <div className="px-4">
            <Link to={"/"}>
              <img
                src="/icons/bakultur.png"
                width={"40"}
                className="lg:3/4"
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center px-4">
            <button
              type="button"
              className={`group block rounded-lg px-2 py-2 hover:bg-dark hover:text-white lg:hidden lg:py-0 ${isHamburgerActive ? "hamburger-active" : ""}`}
              onClick={handleHamburgerClick}
            >
              <span
                className={`my-2 block h-[2px] w-8 bg-black fill-current transition-all duration-300 group-hover:bg-white ${isHamburgerActive ? "origin-left" : ""}`}
              ></span>
              <span
                className={`my-2 block h-[2px] w-8 bg-black transition-all duration-300 group-hover:bg-white ${isHamburgerActive ? "w-0" : ""}`}
              ></span>
              <span
                className={`my-2 block h-[2px] w-8 bg-black transition-all duration-300 group-hover:bg-white ${isHamburgerActive ? "origin-left" : ""}`}
              ></span>
            </button>

            <nav
              id="nav-menu"
              className={`absolute right-0 top-full w-full max-w-[250px] rounded-b-lg bg-white/70 py-5 shadow-lg transition-all duration-500 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-3 lg:shadow-none ${isHamburgerActive ? "block" : "hidden"}`}
            >
              <ul className="block lg:flex">
                <li className="group my-2">
                  <Link to="/" className="menu-list">
                    Beranda
                  </Link>
                </li>
                <li className="group my-2">
                  <Link to="/persebaran" className="menu-list">
                    Persebaran
                  </Link>
                </li>
                <li className="group my-2">
                  <button
                    className="menu-list flex items-center"
                    type="button"
                    onClick={handleDropdownClick}
                  >
                    Informasi
                    <span className="ml-3 inline-block h-3 w-3 rotate-45 border-b-2 border-r-2 border-dark"></span>
                  </button>
                </li>

                <div
                  className={`relative ${isDropdownMenu ? "block" : "hidden"}`}
                >
                  <ul className="right-full lg:absolute lg:top-full lg:mr-8 lg:flex lg:flex-col lg:rounded-lg lg:bg-white lg:shadow-lg lg:backdrop-blur-lg">
                    <li className={`group my-2 text-start`}>
                      <Link to="/artikel" className={`menu-list lg:pr-4`}>
                        Artikel
                      </Link>
                    </li>
                    <li className={`group my-2`}>
                      <Link to="/kegiatan" className={`menu-list`}>
                        Kegiatan
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
