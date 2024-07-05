export const HeroSection = (props) => {
    const { img = '/images/hero-img.png', className = 'h-screen', children } = props;
    return (
        <div className={`${className} relative`}>
            <div className={`bg-[url('${img}')] h-full bg-cover bg-center flex px-4 brightness-[.30]`}>
            </div>
            <div className="container mx-auto ">
                <div className="absolute top-1/2 max-w-xl px-6 ">
                    {children}
                </div>
            </div>
        </div>
    );
};