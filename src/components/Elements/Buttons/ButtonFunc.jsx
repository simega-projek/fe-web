export const ButtonFunc = (props) => {
  const {
    className = "bg-primary text-white",
    type = "submit",
    children = "button",
    onClick = () => {},
  } = props;
  return (
    <button
      type={type}
      className={`rounded px-4 py-2 font-bold hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
