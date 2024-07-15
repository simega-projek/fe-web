import { Link } from "react-router-dom";
// import { formatDate } from "../../../utils/formatDate";

export default function CardArtikelHome(props) {

    const { to, img = "/images/hero-img.png", title, children, date, className } = props;
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

        <Link to={to} className={`md:max-w-xl bg-white border rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70  ${className}`}>


            <div to={to} className="flex-shrink-1 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                <img src={img} alt="" className="size-full absolute top-0 start-0 object-cover" />
            </div>


            <div className="flex flex-wrap">
                <div className="p-4 flex flex-col h-full sm:p-7">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400">
                        {children.substring(0, 110)}...
                    </p>

                    <div className="mt-5 sm:mt-auto">
                        <p className="text-xs text-gray-500 dark:text-neutral-500">
                            {/* {formatDate(date)} */} {date}
                        </p>
                    </div>
                </div>
            </div>
        </Link >


    );
}




