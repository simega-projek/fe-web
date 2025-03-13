import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";
import HTMLReactParser from "html-react-parser/lib/index";

export const CardArticle = ({ to, title, desc, date, img }) => {
  return (
    <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
      <Link to={to}>
        <img
          alt={title}
          src={img}
          className="h-32 w-full object-cover md:h-40"
        />
      </Link>
      <div className="bg-white p-4 sm:p-6">
        <time className="block text-xs text-gray-500">
          {" "}
          {formattedDate(date)}{" "}
        </time>

        <Link to={to}>
          <h3 className="mt-0.5 text-lg text-gray-900">{title}</h3>
        </Link>

        <div className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {HTMLReactParser(String(desc))}
        </div>
      </div>
    </article>
  );
};
