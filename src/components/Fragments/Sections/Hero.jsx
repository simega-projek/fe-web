export const HeroSection = (props) => {
  const {
    id = "hero",
    img = "/public/images/kantor.svg",
    className = "h-screen",
    children,
  } = props;
  return (
    <div className={`relative w-full ${className} mt-[80px]`} id={id}>
      <div className="relative h-full w-full">
        <img
          src={img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[.30]"
        />
        <div className="container absolute bottom-0 left-0 right-0 top-0 mx-auto flex h-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
    // <div className={`relative w-full ${className}`} id={id}>
    //     <img src={img} alt="" className="w-full object-cover object-center brightness-[.30]" />
    //     <div className="container mx-auto">
    //         <div className="absolute top-1/2 px-6 ">
    //             {children}
    //         </div>
    //     </div>
    // </div>
  );
};

// import React from "react";

// export const HeroSection = (props) => {
//   const {
//     id = "hero",
//     img = "/images/hero-img.png",
//     className = "h-screen",
//     children,
//   } = props;
//   return (
//     <section
//       className={`relative h-screen bg-[url('${img}')] bg-cover bg-center bg-no-repeat`}
//     >
//       <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

//       <div className="relative mx-auto flex h-screen max-w-screen-xl items-center px-4 py-32 sm:px-6 lg:px-8">
//         <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
//           <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
//             Let us find your
//             <strong className="block font-extrabold text-rose-500">
//               {" "}
//               Forever Home.{" "}
//             </strong>
//           </h1>

//           <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
//             illo tenetur fuga ducimus numquam ea!
//           </p>

//           <div className="mt-8 flex flex-wrap gap-4 text-center">
//             <a
//               href="#"
//               className="focus:ring-3 focus:outline-hidden block w-full rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 sm:w-auto"
//             >
//               Get Started
//             </a>

//             <a
//               href="#"
//               className="focus:ring-3 focus:outline-hidden block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow-sm hover:text-rose-700 sm:w-auto"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
