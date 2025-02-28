import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import formattedDate from "../../../utils/formattedDate";

export const CardKegiatanHome = (props) => {
  const {
    to = "/",
    img = "/images/hero-img.png",
    date,
    title,
    className = "",
  } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div
      className={`w-full transition-all duration-300 hover:shadow-lg md:flex md:w-5/12 md:items-center lg:w-1/4 ${className}`}
    >
      <Link to={to}>
        <div className="group relative mx-auto aspect-[11/12] overflow-hidden rounded-lg shadow-2xl md:h-4/6 lg:h-4/6">
          <img
            src={img}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            alt={title}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary"></div>
          <div className="absolute bottom-0 left-0 z-20 m-4 pl-2 text-white">
            <p className="mb-2 text-lg font-semibold">{dateFormatted}</p>
            <p className="text-lg">{title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
