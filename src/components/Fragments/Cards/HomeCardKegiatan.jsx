import { Link } from "react-router-dom";
// import { formatDate } from "../../../utils/formatDate";

export default function CardKegiatan(props) {
    const { to = '/', img = "/images/hero-img.png", date, title, className = '' } = props;


    return (
        <div className={`w-full lg:w-1/4 md:w-5/12 hover:shadow-lg md:flex md:items-center transition-all duration-300 ${className}`}>
            <Link to={to} >
                <div className="aspect-[11/12] shadow-2xl rounded-lg overflow-hidden group lg:h-4/6 md:h-4/6 mx-auto relative ">
                    <img src={img} className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary z-10"></div>
                    <div className="absolute bottom-0 left-0 m-4 z-20 text-white pl-2">
                        <p className="text-lg font-semibold mb-2">{date}</p>
                        <p className="text-lg ">{title}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}