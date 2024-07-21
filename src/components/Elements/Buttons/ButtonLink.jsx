import { Link } from "react-router-dom";

export default function ButtonLink(props) {
    const { children, to, className } = props;

    return (
        <Link to={to}>
            <span className={`block px-4 py-2 rounded-lg shadow-lg  text-center  font-semibold text-lg ${className}  `}>{children}</span>
        </Link>
    );
}