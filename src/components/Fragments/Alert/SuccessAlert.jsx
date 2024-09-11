import React from "react";
import { Alert } from "flowbite-react";

export const SuccessAlert = ({
  setMessageSuccess,
  children = "Data berhasil disimpan",
}) => {
  return (
    <div>
      <Alert color="success" onDismiss={() => setMessageSuccess(false)}>
        <span className="font-medium">Sukses!</span> {children}
      </Alert>
    </div>
  );
};
