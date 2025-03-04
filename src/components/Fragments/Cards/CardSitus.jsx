import React from "react";
import { Link } from "react-router-dom";
import maxWord from "../../../utils/maxWord";

export default function CardSitus(props) {
  const {
    to,
    img = "/images/hero-img.png",
    title,
    desc,
    publish = "Publik",
  } = props;

  const isPublic = ["public", "Public", "publik", "Publik"].includes(publish);

  return (
    <Link
      to={to}
      className={`flex w-full flex-wrap transition-all duration-300 hover:shadow-lg md:w-1/3 lg:w-1/4 lg:items-center`}
    >
      <div className="group relative mx-auto h-64 overflow-hidden rounded-lg shadow-2xl md:h-72 lg:h-80">
        <div className="absolute right-0 top-0 z-20 px-1 text-white">
          {/* belum selesai penamaan publik nya */}
          <p
            className={`mt-1 rounded-full bg-white/45 px-2 py-1 text-xs font-bold ${isPublic ? "text-green-600" : "text-primary"}`}
          >
            {publish}
          </p>
        </div>
        <img
          src={img}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          alt=""
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary"></div>
        <div className="absolute bottom-0 left-0 z-20 m-2 pl-1 text-white md:m-5">
          <p className="mb-2 text-base font-bold md:text-base lg:text-lg">
            {title}
          </p>

          <div
            className="truncate text-wrap text-base md:text-base"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></div>
        </div>
      </div>
    </Link>
  );
}
