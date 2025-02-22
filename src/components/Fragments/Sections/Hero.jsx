export const HeroSection = (props) => {
  const {
    id = "hero",
    img = "/images/hero-img.png",
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
