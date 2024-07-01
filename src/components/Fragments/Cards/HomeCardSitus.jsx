import ButtonLink from "../../Elements/Buttons/ButtonLink";

export default function CardSitusHome(props) {
    const { img, children, to, title } = props;
    return (
        <div className={`flex flex-wrap md:px-10`}>
            {/* image */}
            <div className="aspect-[4/3] w-full mx-auto group overflow-hidden rounded-lg px-6 lg:w-1/2 lg:order-last">
                <img src={img} className={`h-full w-full object-cover object-center  rounded-lg`} />
            </div>
            {/* card isi */}
            <div className="w-full px-6 lg:w-1/2 ">
                <h1 className="text-xl font-bold text-primary pt-4 md:text-3xl lg:text-4xl">{title}</h1>
                <p className="text-base md:text-xl md:mb-5 leading-relaxed font-medium md:leading-normal lg:text-xl mb-2 lg:py-4">{children}</p>
                <ButtonLink to={to} className={`bg-primary text-white lg:w-2/3 md:w-1/3`}>
                    Lean More
                    <svg className="inline w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>

                </ButtonLink>

            </div>

        </div>
        // <div className={`flex flex-wrap justify-center  mx-auto lg:w-full `}>
        //     {/* image */}
        //     <div className="w-full px-6 lg:w-1/2 lg:order-last flex md:bg-blue-300 md:">

        //         <div className="aspect-[4/3] drop-shadow-2xl shadow-2xl rounded-xl overflow-hidden mt-6 group lg:h-full md:h-4/6 mx-auto lg:m-auto ">
        //             <img src={img} className={`h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500`}  ></img>
        //         </div>

        //     </div>
        //     {/* card isi */}
        //     <div className="w-full px-6 lg:w-1/2 ">
        //         <h1 className="text-xl font-bold text-primary pt-4 lg:text-2xl">{title}</h1>
        //         <p className=" text-base md:text-xl leading-relaxed font-medium lg:text-xl mb-2 lg:py-4 md:mb-0">{children}</p>
        //         <div>

        //             <ButtonLink to={to} className={`bg-primary text-white lg:w-1/3 md:w-1/3`}>
        //                 Lean More
        //                 <svg className="inline w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
        //                 </svg>

        //             </ButtonLink>
        //         </div>
        //     </div>

        // </div>
    );
}

