import React from 'react';
import { Link } from 'react-router-dom';

export default function CardSitus(props) {
    const { to, img = '/images/hero-img.png', title, children } = props;
    return (
        <div className={`w-full hover:shadow-lg lg:flex lg:items-center transition-all duration-300`}>
            <Link to={to}>
                <div className=" shadow-2xl max-h-52 rounded-lg overflow-hidden group lg:max-h-80 md:max-h-72 mx-auto relative">
                    <img src={img} className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary z-10"></div>
                    <div className="absolute bottom-0 left-0 md:m-5 m-2 z-20 text-white pl-1 lg:w-1/2">
                        <p className="text-lg font-bold mb-2 md:text-3xl lg:text-4xl">
                            {title}
                        </p>

                        <p className=" truncate h-[53px] text-wrap text-base md:text-xl md:w-4/6 ">{children} </p>
                    </div>
                </div>
            </Link>
        </div>

    );
}
