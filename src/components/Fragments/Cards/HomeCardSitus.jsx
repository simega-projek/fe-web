import ButtonLink from "../../Elements/Buttons/ButtonLink";

export default function CardSitusHome(props) {
    const { img = "/images/hero-img.png", children, to, title } = props;
    return (
        <div className={`flex flex-wrap shadow-lg py-6 lg:shadow-none justify-center`}>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg lg:w-1/3 lg:order-last px-6">
                <img src={img} className={`h-full w-full object-cover object-center  rounded-lg`} />
            </div>

            <div className="w-full px-6 lg:w-1/2 ">
                <h1 className="text-xl font-bold text-primary pt-4 md:text-2xl lg:text-3xl">{title}</h1>

                <p className="text-base md:text-lg md:mb-5 leading-relaxed font-medium md:leading-normal  mb-2 lg:py-4">{children.substring(0, 350)}...</p>
                <ButtonLink to={to} className={`bg-primary text-white lg:w-1/3 md:w-1/3`}>
                    Lean More
                    <svg className="inline w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>

                </ButtonLink>

            </div>

        </div>


    );
}

