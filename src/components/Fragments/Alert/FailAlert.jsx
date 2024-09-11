import React from "react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export const FailAllert = ({
  setMessageError,
  children = "Data gagal disimpan",
}) => {
  return (
    <div>
      <Alert
        color="failure"
        icon={HiInformationCircle}
        onDismiss={() => setMessageError(null)}
      >
        <span className="font-medium">Gagal!</span> {children}
      </Alert>
    </div>
  );
};
