"use client";
import { useSelector } from "react-redux";
import { useLogin } from "../../../useHooks/useLogin";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Button, Dropdown, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const isSidebarOpen = useSelector((state) => state.sidebar.status);
  const username = useLogin();
  const navigasi = useNavigate();
  const [isModal, setisModal] = useState(false);
  const [isDropdown, setisDropdown] = useState(false);
  const dropdownRef = useRef(null);

  function handleLogout() {
    localStorage.clear();
    navigasi("/admin/login");
  }

  function handleisDropdown() {
    setisDropdown(!isDropdown);
  }

  // document.addEventListener("click", function () {
  //   handleisDropdown();
  // });

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-center bg-tan p-2 px-10 dark:bg-[#0F172A]">
        <div
          className={`logo ${isSidebarOpen ? "-ml-20" : "ml-12"} flex h-full flex-none transform items-center justify-center duration-500 ease-in-out dark:text-white`}
        >
          Sistem Informasi Megalitikum
        </div>
        {/* <!-- SPACER --> */}
        <div className="flex h-full grow items-center justify-center"></div>
        <div className="relative mr-10 flex h-full flex-none items-center justify-center text-center">
          <div
            className="flex cursor-pointer items-center space-x-3 px-3"
            onClick={handleisDropdown}
          >
            <div className="flex flex-none justify-center">
              <div className="flex h-8 w-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="rounded-full object-cover shadow"
                />
              </div>
            </div>

            <div className="md:text-md hidden text-sm text-black dark:text-white md:block">
              {username}
            </div>
          </div>

          <Dropdowns
            isDropdown={isDropdown}
            setisModal={() => setisModal(true)}
            ref={dropdownRef}
          />
        </div>
      </div>

      <Modal show={isModal} size="md" onClose={() => setisModal(false)} popup>
        <Modal.Body>
          <div className="py-5 text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-blackboard dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-blackboard">
              Apakah ingin keluar?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleLogout}>
                {"Ya"}
              </Button>
              <Button color="gray" onClick={() => setisModal(false)}>
                Tidak
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const Dropdowns = forwardRef(({ isDropdown, setisModal }, ref) => {
  return (
    <div
      ref={ref}
      className={`${isDropdown ? "absolute" : "hidden"} top-14 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div className="truncate">name@flowbite.com</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
      >
        <li>
          <Link
            to="profil"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Profil
          </Link>
        </li>
      </ul>
      <div className="py-2">
        <div
          onClick={() => setisModal()}
          className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Sign out
        </div>
      </div>
    </div>
  );
});
