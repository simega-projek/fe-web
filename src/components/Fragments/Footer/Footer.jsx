import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section
        id="footer"
        className="relative inset-x-0 bottom-0 z-[998] bg-primary"
      >
        <div className="flex flex-wrap justify-center py-10">
          <div className="w-full pb-10 text-center md:w-1/2 lg:w-1/4">
            <img
              src="/public/icons/bakultur.png"
              width={60}
              alt=""
              className="mx-auto invert filter"
            />

            <h2 className="text-lg text-white">
              Sistem Informasi <p>Megalitikum Sulawesi Tengah</p>
            </h2>
          </div>

          <div className="w-full pb-10 text-center text-white md:w-1/2 lg:w-1/4 lg:py-0">
            <h1 className="mb-2 text-2xl font-semibold">Kontak</h1>
            <h3 className="text-lg">Palu, Sulawesi Tengah</h3>
            <div className="flex items-center justify-center text-lg">
              Jl. Gatot Subroto No.26, Besusu Tengah, Kec. Palu Tim., Kota Palu,
              Sulawesi Tengah 94111
            </div>
          </div>

          <div className="w-full pb-10 text-center text-white md:w-1/2 lg:w-1/4 lg:py-0">
            <h1 className="mb-2 text-2xl font-semibold">Konten</h1>
            <ul className="text-lg">
              <li>
                <a href="#about">Tentang</a>
              </li>
              <li>
                <a href="#situs">Situs</a>
              </li>
              <li>
                <a href="#kegiatan">Kegiatan</a>
              </li>
              <li>
                <a href="#artikel">Artikel & Berita</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4">
            <div className="w-full text-center">
              <h1 className="mb-2 text-2xl font-semibold text-white">
                Sosial Media
              </h1>
            </div>
            <div className="flex w-full justify-center gap-1">
              <Link
                to={"https://www.instagram.com/bpkwil.18/"}
                target="blank"
                className="group flex h-14 w-14 items-center justify-center rounded-full transition duration-300 hover:bg-light"
              >
                <svg
                  className="h-10 w-10 text-white transition duration-300 group-hover:text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to={"https://www.youtube.com/@bpkwilayah18"}
                target="blank"
                className="group flex h-14 w-14 items-center justify-center rounded-full transition duration-300 hover:bg-light"
              >
                <svg
                  className="h-10 w-10 text-white transition duration-300 group-hover:text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-dark text-center">
          <p className="text-sm italic text-light">
            copyright © Lamonti Development 2024
          </p>
        </div>
      </section>
    </>
  );
}
