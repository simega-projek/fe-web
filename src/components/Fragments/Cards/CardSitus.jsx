import React from 'react';
import { Link } from 'react-router-dom';

export default function CardSitus(props) {
    const { to, img = '/images/hero-img.png', title, desc } = props;
    return (
        <Link to={to} className={`w-full hover:shadow-lg flex flex-wrap lg:items-center transition-all duration-300 md:w-1/3 lg:w-1/4`}>
            <div className=" shadow-2xl max-h-52 rounded-lg overflow-hidden group lg:max-h-80 md:max-h-72 mx-auto relative">
                <img src={img} className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary z-10"></div>
                <div className="absolute bottom-0 left-0 md:m-5 m-2 z-20 text-white pl-1 ">
                    <p className="text-base font-bold mb-2 md:text-base lg:text-lg">
                        {title}
                    </p>

                    <p className=" truncate text-wrap text-base md:text-base ">{desc} </p>
                </div>
            </div>

        </Link>

    );
}
