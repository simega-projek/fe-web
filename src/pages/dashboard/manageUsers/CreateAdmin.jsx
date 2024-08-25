import React, { useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";

export default function CreateAdmin({ isOpenCreate }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Akun Admin</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <CountenerInput>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nama" className="text-base" />
          </div>
          <TextInput autoFocus id="name" required type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <div className="mb-2 block">
            <Label htmlFor="nip" value="NIK/NIP" className="text-base" />
          </div>
          <TextInput autoFocus id="nip" required type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" className="text-base" />
          </div>
          <TextInput autoFocus id="username" required type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" className="text-base" />
          </div>
          <TextInput autoFocus id="password" required type="text" sizing="md" />
        </CountenerInput>
      </div>

      <ButtonFunc className="m-3 bg-primary text-white">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan">Reset</ButtonFunc>
    </div>
  );
}
