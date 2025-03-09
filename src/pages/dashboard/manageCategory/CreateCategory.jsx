import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { createCategory } from "../../../services/category.service";

export default function CreateCategory({ isOpenCreate, onClose, onSuccess }) {
  const [category, setCategory] = useState("");

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setCategory("");
  };

  const handleCreateCategory = async () => {
    if (category.trim() === "" || !category) {
      setMessageError("Kategori harus diisi");
      setMessageSuccess(null);
      return;
    }
    const data = {
      category,
    };

    try {
      setIsLoading(true);
      const res = await createCategory(data);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        onSuccess();
        handleReset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Tambah Kategori</TitleSection>
        <hr className="my-5" />
        <Button color="red" onClick={onClose}>
          X
        </Button>
      </div>

      {/* alert */}
      <AlertMessage
        messageError={messageError}
        messageSuccess={messageSuccess}
        setMessageError={setMessageError}
        setMessageSuccess={setMessageSuccess}
      />

      {/* create form */}
      <div className="flex flex-wrap">
        <ContainerInput>
          <Label
            htmlFor="category"
            value="Nama Kategori"
            className="mb-2 block text-base"
          />

          <TextInput
            autoFocus
            required
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            type="text"
            sizing="md"
            disabled={isLoading}
            placeholder="Nisan"
            ref={activeRef}
          />
        </ContainerInput>
      </div>

      <ButtonFunc
        className="m-3 bg-primary text-white disabled:cursor-no-drop"
        onClick={handleCreateCategory}
      >
        {isLoading ? "Loading..." : "Simpan"}
      </ButtonFunc>
      <ButtonFunc
        className="bg-tan disabled:cursor-no-drop"
        type="reset"
        onClick={handleReset}
        disabled={isLoading}
      >
        Reset
      </ButtonFunc>
    </div>
  );
}
