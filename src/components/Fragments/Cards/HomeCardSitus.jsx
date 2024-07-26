import ButtonLink from "../../Elements/Buttons/ButtonLink";

export default function CardSitusHome(props) {
  const { img = "/images/hero-img.png", children, to, title } = props;
  return (
    <div
      className={`flex flex-wrap justify-center py-6 shadow-lg lg:shadow-none`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg px-6 lg:order-last lg:w-1/3">
        <img
          src={img}
          className={`h-full w-full rounded-lg object-cover object-center`}
        />
      </div>

      <div className="w-full px-6 lg:w-1/2">
        <h1 className="pt-4 text-xl font-bold text-primary md:text-2xl lg:text-3xl">
          {title}
        </h1>

        <p className="mb-2 text-base font-medium leading-relaxed md:mb-5 md:text-lg md:leading-normal lg:py-4">
          {children.substring(0, 350)}...
        </p>
        <ButtonLink
          to={to}
          className={`bg-primary text-white md:w-1/3 lg:w-1/3`}
        >
          Lean More
          <svg
            className="inline h-6 w-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </ButtonLink>
      </div>
    </div>
  );
}
