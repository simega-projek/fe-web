import React, { useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import InputDropdown from "../../../components/Elements/Inputs/InputDropdown";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { InputMany } from "../../../components/Elements/Inputs/InputMany";

export default function CreateSitus({ isOpenCreate }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Situs</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="situs"
            value="Nama Situs"
            className="mb-2 block text-base"
          />

          <TextInput autoFocus id="situs" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="lembah"
            value="Nama Lembah"
            className="mb-2 block text-base"
          />
          <select
            id="lembah"
            placeholder="Pilih Lembah"
            className="w-full rounded-md"
          >
            <option>Pilih Lembah</option>
          </select>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="kelurahan"
            value="Nama Kelurahan"
            className="mb-2 block text-base"
          />
          <select
            id="kelurahan"
            placeholder="Pilih Kelurahan"
            className="w-full rounded-md"
          >
            <option>Pilih Kelurahan</option>
          </select>
        </CountenerInput>
      </div>

      <ButtonFunc className="m-3 bg-primary text-white">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan">Reset</ButtonFunc>
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
