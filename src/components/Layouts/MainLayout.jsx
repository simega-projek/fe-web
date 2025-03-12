// import { Outlet, useRouteError } from "react-router-dom";
// import { NavbarDashboard } from "../Fragments/Navbar";
// import Footer from "../Fragments/Footer/Footer";
// import ErrorPage from "../../pages/404";

// export default function MainLayout() {
//   const error = useRouteError();
//   console.log(error);
//   return (
//     <div className="flex min-h-screen flex-col">
//       <NavbarDashboard />
//       <div className="flex-grow">
//         {error ? <ErrorPage error={error} /> : <Outlet />}
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { Outlet, useRouteError } from "react-router-dom";
import { NavbarDashboard } from "../Fragments/Navbar/Navbar";
import Footer from "../Fragments/Footer/Footer";
import ErrorPage from "../../pages/404";
import { FaCircleArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toView } from "../../utils/toView";
export default function MainLayout() {
  const error = useRouteError();
  // console.log(error); // Pastikan error ditangkap dengan benar
  const rexScroll = useSelector((state) => state.sidebar.scroll);

  const handleUpTo = () => {
    toView("top");
  };

  return (
    <div className="realtive flex min-h-screen flex-col">
      <NavbarDashboard />
      <div className="">{error ? <ErrorPage error={error} /> : <Outlet />}</div>
      <Footer />
      {rexScroll && (
        <button
          onClick={handleUpTo}
          className="fixed bottom-10 right-10 z-[99999999] rounded-full bg-white p-3 text-primary shadow-lg"
        >
          <FaCircleArrowUp />
        </button>
      )}
    </div>
  );
}
