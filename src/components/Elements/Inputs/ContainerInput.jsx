import React from "react";

export const ContainerInput = ({ children, className }) => {
  return (
    <>
      <div className={`w-full px-3 md:w-1/2 lg:w-1/3 ${className}`}>
        <div className="mb-2">{children}</div>
      </div>
    </>
  );
};
