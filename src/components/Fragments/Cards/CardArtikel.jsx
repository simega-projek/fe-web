import { Link } from "react-router-dom";

export default function CardArtikel(props) {
    const { to = '/', img, children, source, date } = props;
    return (
        <div className={`p-3 max-w-md rounded-lg shadow-xl group overflow-hidden flex-shrink-0`}>
            <Link to={to}>
                <img src={img} className="aspect-[4/3]  object-cover group-hover:scale-110 transition-all duration-500 " alt="" />
                <div className="px-3 py-5">

                    <h1 className="mb-3 text-xl lg:text-2xl font-semibold">{children}</h1>
                    <p className="border-t-2 text-light text-sm py-2 lg:text-base">Sumber: <i>{source}</i></p>
                    <p className="text-light text-base lg:text-lg">{date}</p>
                </div>
            </Link>
        </div>
    );
}

