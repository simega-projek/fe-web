import { Link } from "react-router-dom";
import TitleSection from "../../components/Elements/TitleSection";
import { LoginForm } from "../../components/Fragments/Form/LoginForm";

export default function Login() {
  return (
    <>
      <section className="box-border flex h-screen flex-col lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Logo"
            src="/public/images/logo-bpk.svg" // Ganti dengan path logo yang benar
            className="absolute inset-0 h-full w-full object-cover lg:object-contain"
          />
        </aside>

        <main className="box-border flex flex-grow items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="box-border max-w-xl md:rounded-xl md:bg-white md:p-10 md:shadow-2xl md:shadow-tan lg:max-w-3xl">
            <TitleSection className="my-5 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Selamat Datang Admin 👋
            </TitleSection>

            <p className="mt-4 leading-relaxed text-gray-500">
              Aplikasi ini dirancang khusus untuk memudahkan admin Balai
              Pelestarian Kebudayaan XVIII dalam mengelola dan memelihara
              informasi mengenai situs-situs bersejarah.
            </p>

            <LoginForm />

            <Link
              to={"/"}
              className="group mx-auto mt-4 flex w-fit text-blue-600 transition-all duration-300 hover:underline md:mx-0"
            >
              <i>
                <svg
                  className="hidden text-transparent transition-all duration-300 group-hover:block group-hover:text-blue-600"
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

              <span className="">Kembali ke halaman utama</span>
            </Link>
          </div>
        </main>
      </section>
    </>
  );
}
