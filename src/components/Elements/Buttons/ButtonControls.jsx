import { Link } from "react-router-dom";

export const ButtonControls = ({ to, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="mx-1 block rounded-full bg-primary p-2 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500"
    >
      <Icon className="mx-auto" />
    </Link>
  );
};
