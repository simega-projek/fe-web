import React from "react";
import { Alert } from "flowbite-react";

export const FailAllert = ({
  setFailSubmit,
  children = "Data gagal disimpan",
}) => {
  return (
    <div>
      <Alert
        color="failure"
        icon={HiInformationCircle}
        onDismiss={() => setFailSubmit(false)}
      >
        <span className="font-medium">Gagal!</span> {children}
      </Alert>
    </div>
  );
};
