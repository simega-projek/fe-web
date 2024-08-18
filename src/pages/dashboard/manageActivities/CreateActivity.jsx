import React, { useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  Datepicker,
  Dropdown,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";

export default function CreateActivity({ isOpenCreate }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Kegiatan</TitleSection>
      <hr className="my-5" />

      {/* create form */}
      <div className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="title"
            value="Title"
            className="mb-2 block text-base"
          />

          <TextInput autoFocus id="title" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="linkPendaftaran"
            value="Link Pendaftaran"
            className="mb-2 block text-base"
          />

          <TextInput id="linkPendaftaran" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="tanggalPelaksanaan"
            value="Tanggal Pelaksanaan"
            className="mb-2 block text-base"
          />

          <Datepicker id="tanggalPelaksanaan" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="tanggalPendaftaran"
            value="Tanggal Pendaftaran"
            className="mb-2 block text-base"
          />

          <Datepicker id="tanggalPendaftaran" type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />

          <FileInput id="picture" helperText="File harus .jpg .jpeg .png" />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="file" value="File" className="mb-2 block text-base" />

          <FileInput id="file" helperText="File harus .pdf" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="status"
            value="Status Kegiatan"
            className="mb-2 block text-base"
          />

          <Select id="status" required size={`md`}>
            <option>Akan Datang</option>
            <option>Proses</option>
            <option>Selesai</option>
          </Select>
        </CountenerInput>
      </div>

      <div className="mt-2 w-full px-3">
        <Label htmlFor="deskripsi" className="mb-2 block text-base">
          Deskripsi
        </Label>
        <JoditEditor ref={editor} value={content} />
      </div>

      <ButtonFunc className="m-3">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan">Reset</ButtonFunc>
    </div>
  );
}
