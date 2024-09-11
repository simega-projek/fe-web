import { Link } from "react-router-dom";
import TitleSection from "../components/Elements/TitleSection";
import { LoginForm } from "../components/Fragments/Form/LoginForm";

export default function Login() {
  

  return (
    <>
      <section className="flex h-screen flex-col items-center justify-center px-10">
        <TitleSection className="max-w-sm px-5 text-center">
          Login Admin Explorer Megalit
        </TitleSection>

        <LoginForm />

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
