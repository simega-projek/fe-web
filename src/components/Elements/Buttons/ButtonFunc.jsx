export const ButtonFunc = (props) => {
  const {
    className = "",
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
      className={`cursor-pointer rounded bg-primary px-4 py-2 font-bold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
