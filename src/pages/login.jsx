import axios from "axios";
import TitleSection from "../components/Elements/TitleSection";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authLogin } from "../services/auth.service";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { LoginForm } from "../components/Fragments/Form/LoginForm";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const navigation = useNavigate();

  // const handleSubmit = async (username, password) => {
  //   try {
  //     if (!username || !password || (!username && !password)) {
  //       return setErrorLogin("Isi Username atau password");
  //     }

  //     const token = await authLogin(username, password);

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //       navigation("/admin/dashboard");
  //     } else {
  //       setErrorLogin("Username atau password salah");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (username, password) => {
    try {
      if (!username || !password || (!username && !password)) {
        return setErrorLogin("Isi Username atau password");
      }

      const token = await authLogin(username, password);
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigation("/admin/dashboard");
      } else {
        setErrorLogin("Username atau password salah");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="flex h-screen flex-col items-center justify-center px-10">
        <TitleSection className="max-w-sm px-5 text-center">
          Login Admin Explorer Megalit
        </TitleSection>

        {errorLogin && (
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setErrorLogin(null)}
            className="mt-5"
          >
            <span className="font-medium">{errorLogin}</span>
          </Alert>
        )}

        <LoginForm onSubmit={handleSubmit} />

        <Link to={"/"} className="group flex">
          <i>
            <svg
              className="text-transparent transition-all duration-300 group-hover:text-gray-800 group-hover:dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </i>
          <span>Kembali ke halaman utama</span>
        </Link>
      </section>
    </>
  );
}
