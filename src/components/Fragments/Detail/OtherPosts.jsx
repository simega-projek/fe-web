import parse from "html-react-parser";
import { Link } from "react-router-dom";
export const OtherPosts = ({ title, desc, to }) => {
  return (
    <article className="shadow-xs truncate rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-md transition hover:shadow-lg">
      <Link to={to} className="mt-0.5 text-lg font-medium text-gray-900">
        {title}
      </Link>

      <div className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        {parse(String(desc))}
      </div>

      <Link
        to={to}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
      >
        Baca lainnya
        <span
          aria-hidden="true"
          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
        >
          &rarr;
        </span>
      </Link>
    </article>
  );
};
