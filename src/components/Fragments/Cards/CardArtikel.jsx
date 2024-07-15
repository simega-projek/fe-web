import { Link } from "react-router-dom";

export default function CardArtikel(props) {
    const { to = '/artikel', img = '/images/hero-img.png', title, source, date } = props;
    return (

        <Link to={to} className="relative p-3 rounded-lg shadow-xl group overflow-hidden w-full md:w-1/3 lg:w-1/4 bg-white flex flex-col">
            <img src={img} className="aspect-[4/3] object-cover hover:scale-110 transition-all duration-500 rounded-md" alt="" />
            <div className="px-3 py-5 pb-16 relative flex flex-grow flex-col">
                <h1 className="mb-3 text-base lg:text-xl font-semibold hover:text-primary">{title.substring(0, 60)}...</h1>
                <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2">
                    <p className="border-t-2 text-light text-sm lg:text-base">Sumber: <i>{source}</i></p>
                    <p className="text-light text-xs md:text-sm lg:text-base">{date}asd</p>
                </div>
            </div>
        </Link>

    );
}
