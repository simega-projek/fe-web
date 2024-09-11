import { useSelector } from "react-redux";
import { FaHome, FaHeadphones, FaCloudMeatball, FaCity } from "react-icons/fa";
export const Content = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.sidebar.status);
  return (
    <div
      className={`content ${isSidebarOpen ? "ml-60" : "ml-16"} transform px-4 pb-4 pt-20 duration-500 ease-in-out md:px-5`}
    >
      {children}
    </div>
  );
};
