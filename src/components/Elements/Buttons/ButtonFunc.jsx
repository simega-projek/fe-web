export const ButtonFunc = (props) => {
  const {
    className = "bg-primary text-white",
    type = "submit",
    children = "button",
    onClick = () => {},
    disabled = false,

    value,
  } = props;

  return (
    <button
      value={value}
      type={type}
      className={`cursor-pointer rounded px-4 py-2 font-bold hover:shadow-lg disabled:bg-light ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
