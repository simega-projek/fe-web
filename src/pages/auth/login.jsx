import React from "react";

export const LoginPage = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/public/images/logo-bpk.svg"
            className="absolute inset-0 h-full w-full object-cover lg:object-contain"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Selamat Datang Admin 👋
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Aplikasi ini dirancang khusus untuk memudahkan admin instansi
              dalam mengelola dan memelihara informasi mengenai situs-situs
              bersejarah.
            </p>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="shadow-xs mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="shadow-xs mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="shadow-xs mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="focus:ring-3 focus:outline-hidden inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600">
                  Create an account
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
