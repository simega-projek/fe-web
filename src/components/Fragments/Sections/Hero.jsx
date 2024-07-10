export const HeroSection = (props) => {
    const { id = 'hero', img = '/images/hero-img.png', className = 'h-screen', children } = props;
    return (
        <div className={`relative w-full ${className} mt-[70px]`} id={id}>
            <div className="relative w-full h-full">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover object-center brightness-[.30]" />
                <div className="container mx-auto flex items-center justify-center h-full absolute top-0 left-0 right-0 bottom-0">
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

