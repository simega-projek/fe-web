import React, { useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

export default function CreateArticle({ isOpenCreate }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Berita & Artikel</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <div className="w-full px-3 lg:w-1/2">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" className="text-base" />
            </div>
            <TextInput autoFocus id="title" type="text" sizing="md" />
          </div>
        </div>
        <div className="w-full px-3 lg:w-1/2">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="picture" value="Gambar" className="text-base" />
            </div>
            <FileInput id="picture" helperText="File harus .jpg .jpeg .png" />
          </div>
        </div>
        <div className="w-full px-3 lg:w-1/2">
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="file" value="File" className="text-base" />
            </div>
            <FileInput id="file" helperText="File harus .pdf" />
          </div>
        </div>
      </div>
      <div className="w-full px-3">
        <Label htmlFor="deskripsi" className="text-base">
          Deskripsi
        </Label>
        <JoditEditor ref={editor} value={content} />
      </div>

      <ButtonFunc className="m-3 bg-primary text-white">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan">Reset</ButtonFunc>
    </div>
  );
}
