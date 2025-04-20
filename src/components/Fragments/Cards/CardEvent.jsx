import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";

export default function CardEvent(props) {
  const {
    to = "/artikel",
    img = "/images/hero-img.jpg",
    title,
    status,
    date = new Date(),
  } = props;

  const formatedDate = formattedDate(date);
  return (
    <Link
      to={to}
      className="group relative flex w-full flex-grow flex-col overflow-hidden rounded-lg bg-white p-3 shadow-lg hover:shadow-2xl"
    >
      <img
        src={img}
        className="aspect-[4/3] rounded-md object-cover transition-all duration-500 hover:scale-125"
        alt=""
      />
      <div className={`relative flex flex-grow flex-col px-1`}>
        <h1
          className="mb-1 line-clamp-3 flex-grow truncate text-wrap text-sm/relaxed drop-shadow-xl hover:text-primary md:text-wrap md:text-base lg:text-xl"
          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}
        >
          {title}
        </h1>
        <div className="py-1">
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
