import { Label, Radio } from "flowbite-react";
import React from "react";

export const RadioButton = (props) => {
  const { value, name, defaultChecked = false, onChange, children } = props;
  return (
    <>
      <Radio
        id={value}
        name={name}
        value={value}
        className="peer hidden"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <Label
        htmlFor={value}
        className="cursor-pointer rounded-sm px-3 py-1 duration-300 ease-in-out peer-checked:bg-primary peer-checked:text-white peer-hover:bg-primary peer-hover:text-white md:text-lg"
      >
        {children}
      </Label>
    </>
  );
};
