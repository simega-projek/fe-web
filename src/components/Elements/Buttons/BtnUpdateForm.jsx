import { Spinner } from "flowbite-react";
import React from "react";
import { ButtonFunc } from "./ButtonFunc";
import { ContainerInput } from "../Inputs/ContainerInput";

export const BtnUpdateForm = (props) => {
  const { handleUpdate, handleCancle, isLoading, className } = props;
  return (
    <ContainerInput className={`mt-2 flex items-end ${className}`}>
      <ButtonFunc
        className={`mr-2 bg-primary text-white disabled:cursor-no-drop`}
        onClick={handleUpdate}
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
      <ButtonFunc className={`bg-tan`} onClick={handleCancle} type="button">
        Batal{" "}
      </ButtonFunc>
    </ContainerInput>
  );
};
