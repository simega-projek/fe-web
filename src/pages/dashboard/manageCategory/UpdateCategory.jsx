import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import {
  getOneCategory,
  updateCategory,
} from "../../../services/category.service";

export default function UpdateCategories({
  isOpenUpdate,
  onClose,
  onSuccess,
  id,
}) {
  const [category, setCategory] = useState("");

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (category.trim() === "" || !category) {
      setMessageError("Kategori harus diisi");
      setMessageSuccess(null);
      return;
    }

    const formData = new FormData();
    formData.append("category", category);

    try {
      setIsLoading(true);
      const res = await updateCategory(id, formData);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        if (onSuccess) {
          onSuccess();

          setTimeout(() => {
            onClose();
            setMessageSuccess(null);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneCategory = async () => {
    try {
      setIsLoading(true);
      const res = await getOneCategory(id);
      setCategory(res?.data?.category);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOneCategory();
    }
  }, [id]);

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Edit Data Kategori</TitleSection>
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
      <form onSubmit={handleUpdateCategory} className="flex flex-wrap">
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
            ref={activeRef}
          />
        </ContainerInput>
      </form>
      <ButtonFunc
        className="m-3 bg-primary text-white disabled:cursor-no-drop"
        disabled={isLoading}
        onClick={handleUpdateCategory}
      >
        {isLoading ? "Loading..." : "Simpan"}
      </ButtonFunc>
      <ButtonFunc
        className="m-3 bg-tan"
        type="button"
        onClick={handleBtnCancel}
      >
        Batal
      </ButtonFunc>
    </div>
  );
}
