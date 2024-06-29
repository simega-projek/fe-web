import ButtonLink from "../../Elements/Buttons/ButtonLink";

export default function CardSitusHome(props) {
    const { img, children, to, title } = props;
    return (
        <div className={`flex flex-wrap justify-center  mx-auto lg:w-full `}>
            {/* image */}
            <div className="w-full px-6 lg:w-1/2 lg:order-last lg:flex">

                <div className="aspect-[4/3] drop-shadow-2xl shadow-2xl rounded-xl  overflow-hidden mt-6 group lg:h-full md:h-4/6 mx-auto lg:m-auto">
                    <img src={img} className={`h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500`}  ></img>
                </div>

            </div>
            {/* card isi */}
            <div className="w-full px-6 lg:w-1/2 ">
                <h1 className="text-xl font-bold text-primary pt-4 lg:text-2xl">{title}</h1>
                <p className=" text-base md:text-xl leading-relaxed font-medium lg:text-xl mb-2 lg:py-4">{children}</p>
                <ButtonLink to={to} className={`bg-primary text-white lg:w-1/3`}>
                    Lean More
                </ButtonLink>
            </div>

        </div>
    );
}