import { Link } from "react-router-dom";

export default function CardArtikel(props) {
    const { to = '/persebaran', img = '/images/hero-img.png', children, source, date } = props;
    return (
        // max-w-md
        <div className={`p-3 rounded-lg shadow-xl group overflow-hidden w-full md:w-1/3 lg:w-1/4 bg-white`}>
            <img src={img} className="aspect-[4/3] object-cover hover:scale-110 transition-all duration-500 rounded-md" alt="" />
            <div className="px-3 py-5">

                <Link to={to}>
                    <h1 className="mb-3 text-base lg:text-xl font-semibold hover:text-primary">{children.substring(0, 60)}...</h1>
                </Link>
                <p className="border-t-2 text-light text-sm py-2 lg:text-base">Sumber: <i>{source}</i></p>
                <p className="text-light text-xs md:text-sm lg:text-base">{date}</p>
            </div>
        </div>
    );
}

