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
        <header className="fixed left-0 top-0 z-10 flex w-full items-center justify-center text-poppins bg-white/70">
            <div className="container mx-auto">
                <div className="flex relative items-center justify-between py-2 lg:py-0">
                    <div className="px-4">
                        <Link to={"/"}>
                            <img src="/icons/logo-hitam.svg" width={"80%"} className="lg:3/4" alt="" />
                        </Link>
                    </div>
                    <div className="px-4 flex items-center ">
                        <button
                            type="button"
                            className={`group hover:bg-dark px-2 rounded-lg py-2 lg:py-0 hover:text-white block lg:hidden ${isHamburgerActive ? 'hamburger-active' : ''}`}
                            onClick={handleHamburgerClick}
                        >
                            <span className={`fill-current transition-all duration-300 block h-[2px] w-8 my-2 bg-black group-hover:bg-white ${isHamburgerActive ? 'origin-left' : ''}`}></span>
                            <span className={`transition-all duration-300 block h-[2px] w-8 my-2 bg-black group-hover:bg-white ${isHamburgerActive ? 'w-0' : ''}`}></span>
                            <span className={`transition-all duration-300 block h-[2px] w-8 my-2 bg-black group-hover:bg-white ${isHamburgerActive ? 'origin-left' : ''}`}></span>
                        </button>


                        <nav
                            id="nav-menu"
                            className={`bg-white/70 lg:bg-transparent absolute right-0 top-full w-full max-w-[250px] rounded-b-lg  py-5 lg:py-3 shadow-lg transition-all duration-500 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${isHamburgerActive ? 'block' : 'hidden'}`}
                        >
                            <ul className="block lg:flex">
                                <li className="group my-2 ">
                                    <Link to="/" className="menu-list">
                                        Beranda</Link>
                                </li>
                                <li className="group my-2">
                                    <Link to="/persebaran" className="menu-list">
                                        Persebaran</Link>
                                </li>
                                <li className="group my-2">
                                    <button className="menu-list flex items-center" type="button" onClick={handleDropdownClick}>
                                        Informasi
                                        <span className="inline-block h-3 w-3 border-b-2 border-r-2 rotate-45 ml-3  border-dark"></span>
                                    </button>
                                </li>
                                <div className={` relative ${isDropdownMenu ? 'block' : 'hidden'}`}>

                                    <ul className="lg:bg-white/70 lg:backdrop-blur-lg lg:absolute lg:shadow-lg lg:top-full right-full lg:flex lg:mr-8 lg:flex-col lg:rounded-lg">
                                        <li className={`group my-2 text-start `}>
                                            <Link to="/artikel" className={`menu-list lg:pr-4 `}>Artikel</Link>
                                        </li>
                                        <li className={`group my-2`}>
                                            <Link to="/kegiatan" className={`menu-list `}>Kegiatan</Link>
                                        </li>
                                    </ul>
                                </div>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </header >
    );
}

