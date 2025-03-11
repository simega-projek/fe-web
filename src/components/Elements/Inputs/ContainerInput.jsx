import React from "react";

export const ContainerInput = ({ children, className }) => {
  return (
    <>
      <div className={`mb-2 w-full px-3 md:w-1/2 lg:w-1/3 ${className}`}>
        <div>{children}</div>
      </div>
    </>
  );
};
