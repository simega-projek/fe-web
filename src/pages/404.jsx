
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <Alert className="flex justify-center min-h-screen items-center flex-col text-xl" color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Informasi!</span> Ada beberapa kesalahan~
      <p>Errot {error.statusText || error.message}</p>
    </Alert>
  );
}
