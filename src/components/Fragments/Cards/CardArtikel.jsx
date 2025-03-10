import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";
import { Badge } from "flowbite-react";

export default function CardArtikel(props) {
  const {
    to = "/artikel",
    img = "/images/hero-img.png",
    title,
    status,
    date,
  } = props;

  const formatedDate = formattedDate(date);
  return (
    <Link
      to={to}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg bg-white p-3 shadow-xl"
    >
      <img
        src={img}
        className="aspect-[4/3] rounded-md object-cover transition-all duration-500 hover:scale-110"
        alt=""
      />
      <div
        className={`relative flex flex-grow flex-col px-3 py-5 ${status ? "pb-12" : ""}`}
      >
        <h1 className="mb-5 truncate text-sm font-semibold hover:text-primary md:text-wrap md:text-base lg:text-xl">
          {title}
        </h1>
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-1">
          <p className="border-t-2 text-sm text-light lg:text-base">
            {status ? (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.5rem] font-medium md:text-xs ${status === "Akan Datang" ? "bg-green-100 text-green-800" : status === "Proses" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              >
                {status}
              </span>
            ) : null}
          </p>
          <p className="text-xs text-light md:text-sm lg:text-base">
            {formatedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
