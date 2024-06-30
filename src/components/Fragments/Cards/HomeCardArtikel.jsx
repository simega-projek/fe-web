import { Link } from "react-router-dom";

export default function CardArtikel(props) {
    const { to, img = "/images/hero-img.png", title, children, date, views } = props;
    return (
        <div className="w-full lg:w-5/12 shadow-xl border-[2px] border-white">
            <Link to={to}>
                <div className="flex p-2 bg-white">
                    <div className="w-1/3 ">
                        <img src={img} className="object-cover size-full rounded-md" alt="" />
                    </div>
                    <div className="w-2/3 px-4 py-2 lg:py-4">
                        <h2 className="font-bold text-xl mb-2">{title}</h2>
                        <p className="text-base pb-5 border-b-2 h-3/4">{children.substring(0, 100)}...</p>

                        <div className="flex justify-between text-xs text-light">
                            <p className="w-1/2">{date}</p>
                            <span className=" w-1/2 flex justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={18}><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>
                                <p className="mx-1">{views}</p>

                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}


// function Image({img}) {
//     return (

//     )
// }


// import { Card } from "flowbite-react";
// import { Link } from "react-router-dom";


// export default function CardArtikel(props) {
//     const { to, img = '/images/hero-img.png', title, children, date, views } = props;
//     return (
//         <Link to={to} className="bg-red-800 flex items-center justify-center">
//             <div className="bg-white border rounded-xl shadow-sm sm:flex lg:w-10/12 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
//                 <div className="relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
//                     <img className="size-full absolute top-0 start-0 object-cover" src={img} alt="Image Description" />
//                 </div>
//                 <div className="flex flex-wrap">
//                     <div className="p-4 flex flex-col h-full sm:p-7">
//                         <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                             {title}
//                         </h3>
//                         <p className=" text-base mt-1 text-gray-500 dark:text-neutral-400">
//                             {children.substring(0, 100)}...
//                         </p>
//                         <div className="border-t-2 border-light mt-5 pt-2 sm:mt-auto text-light flex justify-between">
//                             <p className="text-xs dark:text-neutral-500">
//                                 {date}
//                             </p>
//                             <span className="w-1/2 flex justify-end">
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={15}><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>
//                                 <p className="mx-1 text-xs">{views}</p>

//                             </span>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

