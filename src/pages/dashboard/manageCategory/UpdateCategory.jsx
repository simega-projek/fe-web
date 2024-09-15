import React, { useCallback, useEffect, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Button, Dropdown, Label, TextInput } from "flowbite-react";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { getSulawesiTengah } from "../../../services/wilIndonesia.service";
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from "../../../services/category.service";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";

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

  const handleReset = () => {
    setCategory("");
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
          handleReset();
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

  const fetchOneCategory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getOneCategory(id);
      setCategory(res?.data?.category);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOneCategory();
    }
  }, [id]);

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

      {(messageError && (
        <FailAllert setMessageError={setMessageError}>
          {messageError}
        </FailAllert>
      )) ||
        (messageSuccess && (
          <SuccessAlert setMessageSuccess={setMessageSuccess}>
            {messageSuccess}
          </SuccessAlert>
        ))}

      {/* create form */}
      <form onSubmit={handleUpdateCategory} className="flex flex-wrap">
        <CountenerInput>
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
          />
        </CountenerInput>
      </form>
      <ButtonFunc
        className="m-3 bg-primary text-white"
        disabled={isLoading}
        onClick={handleUpdateCategory}
      >
        {isLoading ? "Loading..." : "Simpan"}
      </ButtonFunc>
      <ButtonFunc className="m-3 bg-tan" type="button" onClick={onClose}>
        Batal
      </ButtonFunc>
    </div>
  );
}
