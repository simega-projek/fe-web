import React, { useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import InputDropdown from "../../../components/Elements/Inputs/InputDropdown";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { InputMany } from "../../../components/Elements/Inputs/InputMany";

export default function CreateObjek({ isOpenCreate }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Objek Megalit</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="objek"
            value="Nama Objek"
            className="mb-2 block text-base"
          />

          <TextInput autoFocus id="objek" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="kategori"
            value="Kategori"
            className="mb-2 block text-base"
          />
          <select
            id="kategori"
            placeholder="Pilih Kategori"
            className="w-full rounded-md"
          >
            <option>Pilih Kategori</option>
          </select>
        </CountenerInput>

        <CountenerInput>
          {" "}
          <Label
            htmlFor="garisLintang"
            value="Garis Lintang"
            className="mb-2 block text-base"
          />
          <TextInput id="garisLintang" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="garisBujur"
            value="Garis Bujur"
            className="mb-2 block text-base"
          />

          <TextInput id="garisBujur" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="lembah"
            value="Lembah"
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
            htmlFor="situs"
            value="Situs"
            className="mb-2 block text-base"
          />
          <select
            id="situs"
            placeholder="Pilih Situs"
            className="w-full rounded-md"
          >
            <option>Pilih Situs</option>
          </select>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />

          <InputMany typeInput={FileInput} id={"picture"} />
          <small className="text-light">
            File harus berformat .jpg, .jpeg, .png
          </small>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="video"
            value="Link Video"
            className="mb-2 block text-base"
          />

          <InputMany typeInput={TextInput} id={"video"} />
        </CountenerInput>
      </div>

      <div className="w-full px-3">
        <Label htmlFor="deskripsi" className="mb-2 block text-base">
          Deskripsi
        </Label>
        <JoditEditor ref={editor} value={content} />
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
