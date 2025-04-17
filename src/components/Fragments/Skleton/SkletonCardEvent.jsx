import { Link } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate";

export default function SkletonCardEvent({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative flex w-full flex-grow animate-pulse flex-col overflow-hidden rounded-lg bg-white/50 p-3 shadow-lg"
        >
          <div className="aspect-[4/3] rounded-md bg-gray-300 object-cover transition-all duration-500" />
          <div className={`relative flex flex-grow flex-col bg-white/50 px-1`}>
            <h1 className="my-3 line-clamp-3 h-4 w-full flex-grow rounded-full bg-gray-300"></h1>
            <div className="py-1">
              <div className="border-t-2"></div>
              <div className="mt-3 h-4 w-2/3 rounded-full bg-gray-300"></div>
              <div className="mt-3 h-4 w-1/3 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
