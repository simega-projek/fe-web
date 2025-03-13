import { Link } from "react-router-dom";

export default function ButtonLink(props) {
  const { children, to, classValue, className } = props;

  return (
    <Link to={to} className={className}>
      <span
        className={`block rounded-lg px-4 py-2 text-center text-lg font-semibold shadow-lg ${classValue} `}
      >
        {children}
      </span>
    </Link>
  );
}
