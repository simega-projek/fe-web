import { Link } from "react-router-dom";
// import { formatDate } from "../../../utils/formatDate";
import parse from "html-react-parser";
import formattedDate from "../../../utils/formattedDate";
import maxWord from "../../../utils/maxWord";
export const CardArtikelHome = (props) => {
  const {
    to,
    img = "/images/hero-img.png",
    title,
    desc,
    date,
    className,
  } = props;

  // const limitWord = maxWord(desc, 30);
  const formatedDate = formattedDate(date);
  return (
    // <div className="w-full lg:w-5/12 shadow-xl border-[2px] border-white">
    //     <Link to={to}>
    //         <div className="flex p-2 bg-white">
    //             <div className="w-2/5">
    //                 <img src={img} className="object-cover size-full rounded-md" alt="" />
    //             </div>
    //             <div className="w-2/3 px-4 py-2 lg:py-4 md:flex  md:flex-col">
    //                 <h2 className=" font-bold text-xl mb-2">{title}</h2>
    //                 <p className=" text-base border-b-2 ">{children.substring(0, 100)}...</p>
    //                 <p className="text-xs text-light">{formatDate(date)}</p>

    //             </div>
    //         </div>
    //     </Link>
    // </div>

    <Link
      to={to}
      className={`rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70 sm:flex md:max-w-xl ${className}`}
    >
      <div
        to={to}
        className="flex-shrink-1 relative w-full overflow-hidden rounded-t-xl pt-[40%] sm:max-w-60 sm:rounded-s-xl md:max-w-xs md:rounded-se-none"
      >
        <img
          src={img}
          alt=""
          className="absolute start-0 top-0 size-full object-cover"
        />
      </div>

      <div className="flex flex-wrap">
        <div className="flex h-full flex-col p-4 sm:p-7">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          {/* <div dangerouslySetInnerHTML={{ __html: desc }} className="mt-1 text-gray-500 dark:text-neutral-400">
            {parse(desc)}...
          </div> */}

          <div className="mt-5 sm:mt-auto">
            <p className="text-xs text-gray-500 dark:text-neutral-500">
              {/* {formatDate(date)} {date} */} {formatedDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
