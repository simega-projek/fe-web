// import { HiInformationCircle } from "react-icons/hi";
// import { Alert } from "flowbite-react";
// import { useRouteError } from "react-router-dom";

// export default function ErrorPage({ error }) {
//   const errorRoute = useRouteError();
//   console.log({ errorRoute });

//   return (
//     <Alert
//       className="flex min-h-screen flex-col items-center justify-center text-xl"
//       color="failure"
//       icon={HiInformationCircle}
//     >
//       {/* <span className="font-medium">{error.status}!</span>
//       <p>Errot {error.statusText || error.message}</p> */}
//     </Alert>
//   );
// }

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function ErrorPage({ error }) {
  console.log({ error }); // Memastikan error diterima dengan benar

  return (
    <Alert
      className="flex min-h-screen flex-col items-center justify-center text-xl"
      color="failure"
      icon={HiInformationCircle}
    >
      <span className="font-medium">{error?.status} 404!</span>
      <p>Error: {error?.statusText || error?.message} Data Tidak Ditemukan!</p>
    </Alert>
  );
}
