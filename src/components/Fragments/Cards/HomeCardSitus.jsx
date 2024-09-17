// import ButtonLink from "../../Elements/Buttons/ButtonLink";

// export default function CardSitusHome(props) {
//   const { img = "/images/hero-img.png", children, desc, to, title } = props;
//   return (
//     <div
//       className={`flex flex-wrap justify-center py-6 shadow-lg lg:shadow-none`}
//     >
//       <div className="aspect-[4/3] w-full overflow-hidden rounded-lg px-6 lg:order-last lg:w-1/3">
//         <img
//           src={img}
//           className={`h-full w-full rounded-lg object-cover object-center`}
//         />
//       </div>

//       <div className="w-full px-6 lg:w-1/2">
//         <h1 className="pt-4 text-xl font-bold text-primary md:text-2xl lg:text-3xl">
//           {title}
//         </h1>

//         <div
//           className="mb-2 text-base font-medium leading-relaxed md:mb-5 md:text-lg md:leading-normal lg:py-4"
//           dangerouslySetInnerHTML={{ __html: desc }}
//         >

//         </div>
//         <ButtonLink
//           to={to}
//           className={`bg-primary text-white md:w-1/3 lg:w-1/3`}
//         >
//           Lean More
//           <svg
//             className="inline h-6 w-6 text-white"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 12H5m14 0-4 4m4-4-4-4"
//             />
//           </svg>
//         </ButtonLink>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import maxWord from "../../../utils/maxWord";
import ButtonLink from "../../Elements/Buttons/ButtonLink";
import parse from "html-react-parser";

export const CardSitusHome = (props) => {
  const { img = "/images/hero-img.png", desc, to, title } = props;

  const wordLimit = maxWord(desc, 30);

  return (
    <Link
      to={to}
      className="group flex min-h-[400px] flex-wrap justify-center rounded-lg border border-gray-200 py-6 shadow-lg lg:shadow-none"
    >
      {/* Wrapper untuk gambar dengan aspect ratio */}
      <div className="w-full px-6 lg:order-last lg:w-1/3">
        <div className="aspect-[4/3] h-full w-full overflow-hidden rounded-lg">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover object-center"
            width={200}
            height={300}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 lg:w-1/2">
        <h1 className="pt-4 text-xl font-bold text-primary md:text-2xl lg:text-3xl">
          {title}
        </h1>

        <div className="mb-2 text-base font-medium leading-relaxed md:mb-5 md:text-lg md:leading-normal lg:py-4">
          {parse(wordLimit)}
        </div>
      </div>
    </Link>
  );
};
