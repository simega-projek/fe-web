import React from "react";
import { Alert } from "flowbite-react";

export const SuccessAlert = ({
  setSuccessSubmit,
  children = "Data berhasil disimpan",
}) => {
  return (
    <div>
      <Alert color="success" onDismiss={() => setSuccessSubmit(false)}>
        <span className="font-medium">Sukses!</span> {children}
      </Alert>
    </div>
  );
};
