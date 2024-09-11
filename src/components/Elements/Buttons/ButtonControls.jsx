import { Link } from "react-router-dom";

export const ButtonControls = ({
  to,
  icon: Icon,
  className,
  children,
  onClick,
}) => {
  if (to) {
    // Jika ada `to`, gunakan `Link` untuk navigasi
    return (
      <Link
        to={to}
        className={`mx-1 block rounded-full bg-primary p-2 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500 ${className} `}
      >
        <Icon className="mx-auto" /> {children}
      </Link>
    );
  } else {
    // Jika tidak ada `to`, gunakan tombol untuk aksi
    return (
      <button
        className={`group mx-1 block rounded-full bg-primary p-2 text-white duration-300 ease-in-out hover:text-purple-500 dark:hover:text-blue-500 ${className} `}
        onClick={onClick}
      >
        <div className="realtive group-hover:flex">
          <span className="hidden group-hover:top-10">Hover</span>
          <Icon className="mx-auto" />
        </div>
      </button>
    );
  }
};
