import React from "react";

export const ContainerInput = ({ children, className }) => {
  return (
    <>
      <div className={`w-full px-3 lg:w-1/2 ${className}`}>
        <div className="mb-2">{children}</div>
      </div>
    </>
  );
};
