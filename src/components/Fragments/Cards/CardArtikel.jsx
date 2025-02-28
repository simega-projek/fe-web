import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";

export default function CardArtikel(props) {
  const {
    to = "/artikel",
    img = "/images/hero-img.png",
    title,
    source,
    date,
  } = props;

  const formatedDate = formattedDate(date);
  return (
    <Link
      to={to}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg bg-white p-3 shadow-xl md:w-1/3 lg:w-1/4"
    >
      <img
        src={img}
        className="aspect-[4/3] rounded-md object-cover transition-all duration-500 hover:scale-110"
        alt=""
      />
      <div className="relative flex flex-grow flex-col px-3 py-5 pb-16">
        <h1 className="mb-3 text-base font-semibold hover:text-primary lg:text-xl">
          {title.substring(0, 60)}...
        </h1>
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2">
          <p className="border-t-2 text-sm text-light lg:text-base">
            Sumber: <i>{source}</i>
          </p>
          <p className="text-xs text-light md:text-sm lg:text-base">
            {formatedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
