export const ButtonFunc = (props) => {
    const {className, type="submit", children = "button", onClick = () => {} } = props
    return (
      <button
        type={type}
        className={`rounded bg-primary px-4 py-2 font-bold text-white hover:shadow-lg ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
}