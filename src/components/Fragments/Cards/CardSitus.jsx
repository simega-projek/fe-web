import React from "react";
import { Link } from "react-router-dom";
import maxWord from "../../../utils/maxWord";
import { Badge } from "flowbite-react";

export default function CardSitus(props) {
  const {
    to,
    img = "/images/hero-img.jpg",
    title,
    desc,
    publish,
    category,
  } = props;

  return (
    <Link
      to={to}
      className={`group relative flex h-36 w-full flex-wrap overflow-hidden rounded-lg shadow-2xl transition-all duration-300 hover:shadow-lg md:h-72 lg:h-80 lg:items-center`}
    >
      <div className="absolute right-0 top-0 z-20 px-1 text-white">
        {/* belum selesai penamaan publik nya */}
        <span
          className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${publish === "public" ? "bg-green-100 text-green-800" : publish === "private" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
        >
          {publish ?? null}
        </span>
      </div>
      <img
        src={img}
        className="w-full object-cover transition-all duration-500 group-hover:scale-110 sm:h-full"
        alt=""
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary"></div>
      <div className="absolute bottom-0 left-0 z-20 m-2 pl-1 text-white md:m-5">
        <div className="mb-2 text-base font-bold lg:text-lg">
          {title}
          <div className="text-sm text-white/70">{category}</div>
        </div>
      </div>
    </Link>
  );
}
