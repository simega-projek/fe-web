import { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { FaBookmark, FaHome, FaSitemap, FaUsers } from "react-icons/fa";
import { GiColombianStatue, GiStoneBust, GiValley } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setIsSidebar } from "../../../redux/slices/sidebarSlice";

import { MdArticle } from "react-icons/md";
import { Link } from "react-router-dom";
export const Asidebars = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.status);
  const role = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [onListMenageObject, setOnListMenageObject] = useState(false);

  let roleAuth = role?.info?.role;
  let roleProfile = role?.data?.role;

  // console.log({ roleAuth });
  // console.log({ roleProfile });
  const toggleOnListMenageObject = () => {
    setOnListMenageObject(!onListMenageObject);
  };

  const toggleSidebar = () => {
    dispatch(setIsSidebar(!isSidebarOpen));
  };
  return (
    <aside
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-40"} fixed z-50 flex h-screen w-64 -translate-x-48 transform bg-primary transition duration-1000 ease-in-out`}
    >
      {/* <!-- open sidebar button --> */}
      <div
        className={`max-toolbar ${isSidebarOpen ? "translate-x-0" : "translate-x-24 scale-x-0"} absolute -right-6 top-2 flex h-12 w-full transform items-center justify-between rounded-full border-4 border-white bg-primary transition duration-300 ease-in dark:border-[#0F172A]`}
      >
        <div className="group flex items-center rounded-full py-1 pl-10 pr-2 text-white dark:from-cyan-500 dark:to-blue-500">
          <div className="mr-12 transform text-2xl duration-300 ease-in-out">
            BPK XVIII
          </div>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className="absolute -right-6 top-2 flex transform cursor-pointer rounded-full border-4 border-white bg-primary p-3 text-white transition duration-500 ease-in-out hover:rotate-45 hover:bg-tan dark:border-[#0F172A] dark:hover:bg-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      </div>
      {/* <!-- MAX SIDEBAR--> */}
      <div
        className={`mt-20 flex ${!isSidebarOpen ? "ml-5 translate-x-40" : ""} h-[calc(100vh)] w-full flex-col space-y-2 text-white`}
      >
        <SidebarItem
          label={"Dashboard"}
          to={"dashboard"}
          icon={FaHome}
          isOpen={isSidebarOpen}
        />

        <p
          className={`flex ${!isSidebarOpen ? "w-fit" : "w-full"} transform cursor-pointer flex-row items-center space-x-3 rounded-full bg-primary p-2 pl-8 text-white duration-300 ease-in-out hover:ml-4`}
          onClick={toggleOnListMenageObject}
        >
          <GiColombianStatue /> {isSidebarOpen && <span>Kelola Megalit</span>}
        </p>
        {onListMenageObject && (
          <>
            <SidebarItem
              label={"Lembah"}
              to={"kelola-lembah"}
              icon={GiValley}
              isOpen={isSidebarOpen}
              classLabel={"ml-3"}
            />
            <SidebarItem
              label={"Situs"}
              to={"kelola-situs"}
              icon={FaSitemap}
              isOpen={isSidebarOpen}
              classLabel={"ml-3"}
            />
            <SidebarItem
              label={"Kategori"}
              to={"kelola-kategori"}
              icon={BiLibrary}
              isOpen={isSidebarOpen}
              classLabel={"ml-3"}
            />
            <SidebarItem
              label={"Objek"}
              to={"kelola-objek"}
              icon={GiStoneBust}
              isOpen={isSidebarOpen}
              classLabel={"ml-3"}
            />
          </>
        )}
        <SidebarItem
          label={"Kelola Artikel"}
          to={"kelola-artikel"}
          icon={MdArticle}
          isOpen={isSidebarOpen}
        />
        <SidebarItem
          label={"Kelola Kegiatan"}
          to={"kelola-kegiatan"}
          icon={FaBookmark}
          isOpen={isSidebarOpen}
        />
        {(roleAuth === "superadmin" || roleProfile === "superadmin") && (
          <SidebarItem
            label={"Kelola Admin"}
            to={"kelola-user"}
            icon={FaUsers}
            isOpen={isSidebarOpen}
          />
        )}
      </div>
    </aside>
  );
};

const SidebarItem = ({
  label,
  to = "#",
  icon: Icon,
  isOpen,
  className,
  classLabel,
}) => {
  return (
    <Link
      to={to}
      className={`flex ${!isOpen ? "w-fit" : "w-full"} transform cursor-pointer flex-row items-center space-x-3 rounded-full bg-primary p-2 pl-8 text-white duration-300 ease-in-out hover:ml-4 ${className}`}
    >
      <Icon className={classLabel} />
      {isOpen && <span>{label}</span>}
    </Link>
  );
};
