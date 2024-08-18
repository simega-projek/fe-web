import { Link } from "react-router-dom";
import { FaHome, FaHeadphones, FaCloudMeatball, FaCity } from "react-icons/fa";

export const CardLength = ({ to, title, lots, icon: Icon }) => {
  return (
    <Link to={to} className="w-full p-2 md:w-1/2 lg:w-1/3">
      <div className="flex w-full flex-row items-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 dark:from-cyan-500 dark:to-blue-500">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-2 text-indigo-500 dark:bg-[#0F172A] dark:text-white md:h-12 md:w-12">
          <Icon className="h-full w-full" />
        </div>
        <div className="ml-5 flex flex-grow flex-col justify-around text-white">
          <div className="whitespace-nowrap text-lg">Total {title}</div>
          <div className="text-xl">{lots}</div>
        </div>
        <div className="flex flex-none items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export const CardDashboard = ({ title, lots, to, icon: Icon }) => {
  return (
    <Link to={to} className="w-full p-2 md:w-1/2 lg:w-1/3">
      <div className="flex w-full rounded-lg bg-gradient-to-b from-secondary via-primary to-tan px-4 py-5 shadow-lg">
        <div className="h-16 w-16 rounded-md bg-white p-2 text-primary">
          <Icon className="h-full w-full" />
        </div>
        <div className="ml-3 flex flex-grow flex-col justify-between text-white">
          <p className="whitespace-nowrap text-xl">Total {title}</p>
          <p className="text-lg">{lots}</p>
        </div>
        <div className="flex items-center justify-self-end text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
