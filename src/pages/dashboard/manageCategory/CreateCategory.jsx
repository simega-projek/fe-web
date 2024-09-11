import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Dropdown, Label, TextInput } from "flowbite-react";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { getSulawesiTengah } from "../../../services/wilIndonesia.service";

export default function CreateCategory({ isOpenCreate }) {
  const [categoryField, setCategoryField] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setCategoryField("");
  };

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Kategori</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="category"
            value="Nama Kategori"
            className="mb-2 block text-base"
          />

          <TextInput
            autoFocus
            required
            onChange={(e) => setCategoryField(e.target.value)}
            value={categoryField}
            id="category"
            type="text"
            sizing="md"
          />
        </CountenerInput>
      </div>

      <ButtonFunc className="m-3 bg-primary text-white">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan" onClick={handleReset}>
        Reset
      </ButtonFunc>
    </div>
  );
}

const categoryObject = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Mango",
  "Orange",
  "Pineapple",
  "Strawberry",
  "Watermelon",
];
