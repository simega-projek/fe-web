import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-cover pt-10 md:flex-row lg:gap-10">
      <div className="flex w-full justify-center bg-cover lg:justify-end">
        <img
          src="/public/icons/megalith.jpg"
          className="h-52 md:h-full lg:h-96"
        />
      </div>
      <div className="w-full text-center lg:text-start">
        <h1 className="text-9xl font-black text-gray-400">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ho-hoh!
        </p>

        <p className="mt-4 text-gray-500">Halaman tidak ditemukan.</p>

        <Link
          to={"/"}
          className="focus:ring-3 focus:outline-hidden mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-110 hover:shadow-2xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
