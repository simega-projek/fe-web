import React from "react";
import { Link } from "react-router-dom";
import maxWord from "../../../utils/maxWord";
import { Badge } from "flowbite-react";

export default function CardSitus(props) {
  const {
    to,
    img = "/images/hero-img.png",
    title,
    desc,
    publish,
    category,
  } = props;

  return (
    <Link
      to={to}
      // className={`flex w-full flex-wrap transition-all duration-300 hover:shadow-lg md:w-1/3 lg:w-1/4 lg:items-center`}
      className={`flex w-full flex-wrap transition-all duration-300 hover:shadow-lg lg:items-center`}
    >
      <div className="group relative mx-auto h-64 overflow-hidden rounded-lg shadow-2xl md:h-72 lg:h-80">
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
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          alt=""
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary"></div>
        <div className="absolute bottom-0 left-0 z-20 m-2 pl-1 text-white md:m-5">
          <p className="mb-2 text-base font-bold md:text-base lg:text-lg">
            {title}
            <p className="text-base text-white/70">{category}</p>
          </p>
        </div>
      </div>
    </Link>
  );
}
