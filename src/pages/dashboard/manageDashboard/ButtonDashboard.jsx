import React from "react";

export const ButtonDashboard = (props) => {
  const { onClick = () => {}, type = "button", children } = props;
  return (
    <button
      className="focus:ring-3 focus:outline-hidden group relative inline-block overflow-hidden border border-primary px-8 py-2"
      onClick={onClick}
      type={type}
    >
      <span className="absolute inset-y-0 left-0 w-[2px] bg-primary transition-all group-hover:w-full"></span>

      <span className="relative text-sm font-medium text-primary transition-colors group-hover:text-white">
        {children}
      </span>
    </button>
  );
};
