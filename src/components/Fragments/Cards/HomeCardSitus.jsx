// import parse from "html-react-parser";
// import { Link } from "react-router-dom";
// import maxWord from "../../../utils/maxWord";

// export const CardSitusHome = (props) => {
//   const { img = "/images/hero-img.png", desc, to, title } = props;

//   const wordLimit = maxWord(desc, 30);

//   return (
//     <Link
//       to={to}
//       className="group flex min-h-[400px] flex-wrap justify-center rounded-lg border border-gray-200 py-6 shadow-lg lg:shadow-none"
//     >
//       {/* Wrapper untuk gambar dengan aspect ratio */}
//       <div className="w-full px-6 lg:order-last lg:w-1/3">
//         <div className="aspect-[4/3] h-full w-full overflow-hidden rounded-lg">
//           <img
//             src={img}
//             alt={title}
//             className="h-full w-full object-cover object-center"
//             width={200}
//             height={300}
//           />
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="w-full px-6 lg:w-1/2">
//         <h1 className="pt-4 text-xl font-bold text-primary md:text-2xl lg:text-3xl">
//           {title}
//         </h1>

//         <div className="mb-2 text-base font-medium leading-relaxed md:mb-5 md:text-lg md:leading-normal lg:py-4">
//           {parse(wordLimit)}
//         </div>
//       </div>
//     </Link>
//   );
// };

import React from "react";
import maxWord from "../../../utils/maxWord";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export const CardSitusHome = (props) => {
  const { img = "/images/hero-img.png", desc, to, title } = props;

  const wordLimit = maxWord(desc, 200);
  return (
    <article className="flex bg-transparent shadow-2xl transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]"></div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt={title}
          src={img}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <Link to={to}>
            <h3 className="font-bold uppercase text-gray-900">{title}</h3>
          </Link>

          <p className="mt-2 line-clamp-3 truncate text-wrap text-sm/relaxed text-gray-700">
            {parse(String(desc))}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            to={to}
            className="block bg-primary px-5 py-3 text-center text-xs font-bold uppercase text-light transition hover:bg-yellow-400"
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </article>
  );
};
