import parse from "html-react-parser";
import React from "react";
import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";

export const CardBlog = (props) => {
  const { img = "/images/hero-img.png", desc = "", to, title, date } = props;

  const formatedDate = formattedDate(date);

  return (
    // <article className="flex bg-transparent shadow-2xl transition hover:shadow-xl">
    //   <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
    //     {formatedDate}
    //   </div>

    //   <div className="sm:block sm:basis-56">
    //     <img
    //       alt={title}
    //       src={img}
    //       className="aspect-square h-full w-full object-cover"
    //     />
    //   </div>

    //   <div className="flex flex-1 flex-col justify-between truncate">
    //     <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
    //       <Link to={to}>
    //         <h3 className="font-bold uppercase text-gray-900">{title}</h3>
    //       </Link>

    //       <div className="mt-2 line-clamp-3 truncate text-sm/relaxed text-gray-700">
    //         {parse(String(desc))}
    //       </div>
    //     </div>

    //     <div className="sm:flex sm:items-end sm:justify-end">
    //       <Link
    //         to={to}
    //         className="block bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-light transition hover:bg-yellow-400"
    //       >
    //         Baca Selengkapnya
    //       </Link>
    //     </div>
    //   </div>
    // </article>
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          {formatedDate}
        </div>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt=""
          src={img}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <h3 className="font-bold uppercase text-gray-900">{title}</h3>

          <div className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {parse(String(desc))}
          </div>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            to={to}
            className="block bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-tan"
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </article>
  );
};
