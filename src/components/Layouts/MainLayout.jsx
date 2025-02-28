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
import { NavbarDashboard } from "../Fragments/Navbar";
import Footer from "../Fragments/Footer/Footer";
import ErrorPage from "../../pages/404";

export default function MainLayout() {
  const error = useRouteError();
  console.log(error); // Pastikan error ditangkap dengan benar

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarDashboard />
      <div className="flex-grow">
        {error ? <ErrorPage error={error} /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}
