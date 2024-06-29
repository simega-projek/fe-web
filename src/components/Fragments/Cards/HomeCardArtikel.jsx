import { Link } from "react-router-dom";

export default function CardArtikel(props) {
    const { to, img = "/images/hero-img.png", title, children, date, views } = props;
    return (
        <Link to={to}>
            <div className="flex p-3 bg-white">


                <div className="w-2/6">

                    <img src={img} className="object-cover h-full rounded-md" alt="" />
                </div>
                <div className="w-4/6 px-3">
                    <h2 className="font-bold text-xl mb-2">{title}</h2>
                    <p className="text-base pb-5 border-b-2">{children.substring(0, 150)}...</p>

                    <div className="flex justify-between text-light">
                        <p className="w-1/2">{date}</p>
                        <span className=" w-1/2 flex justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={18}><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>
                            <p className="mx-1">{views}</p>

                        </span>
                    </div>
                </div>
            </div>

        </Link>
    );
}
