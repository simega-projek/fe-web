import React from "react";
import { ButtonFunc } from "./ButtonFunc";
import { Spinner } from "flowbite-react";
import { ContainerInput } from "../Inputs/ContainerInput";

export const BtnCreateForm = (props) => {
  const { handleSubmit, handleReset, isLoading, className } = props;
  return (
    <ContainerInput className={`mt-2 flex items-end ${className}`}>
      <ButtonFunc
        className="mr-2 bg-primary text-white disabled:text-white"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <Spinner
          aria-label="Extra large spinner example"
          size="sm"
          className={`mr-1 ${isLoading ? "inline-block" : "hidden"}`}
          color={"gray"}
        />

        {isLoading ? "Loading..." : "Simpan"}
      </ButtonFunc>

      <ButtonFunc
        className="bg-tan disabled:text-white"
        type="reset"
        onClick={handleReset}
        disabled={isLoading}
      >
        Reset
      </ButtonFunc>
    </ContainerInput>
  );
};
