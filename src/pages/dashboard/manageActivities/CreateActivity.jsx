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
  const [title, setTitle] = useState("");
  const [linkRegistration, setLinkRegistration] = useState("");
  const [dateActivity, setDateActivity] = useState("");
  const [dateRegistration, setdateRegistration] = useState("");
  const [activityStatus, setActivityStatus] = useState("");
  const [activityPictures, setActivityPictures] = useState(null);
  const [activityPdf, setActivityPdf] = useState(null);

  const handleReset = () => {
    console.log({
      title,
      linkRegistration,
      dateActivity,
      dateRegistration,
      activityStatus,
      activityPictures,
      activityPdf,
    });
  };
    setTitle("");
    setLinkRegistration("");
    setDateActivity("");
    setdateRegistration("");
    setActivityStatus("");
    setActivityPictures(null);
    editor.current = null;
    setActivityPdf(null);
    alert("handle reset");

    

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

          <TextInput
            autoFocus
            required
            id="title"
            type="text"
            sizing="md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="linkRegistration"
            value="Link Pendaftaran"
            className="mb-2 block text-base"
          />

          <TextInput
            id="linkRegistration"
            required
            type="text"
            sizing="md"
            value={linkRegistration}
            onChange={(e) => setLinkRegistration(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="dateActivity"
            value="Tanggal Pelaksanaan"
            className="mb-2 block text-base"
          />

          <Datepicker
            id="dateActivity"
            required
            type="text"
            sizing="md"
            value={dateActivity}
            onChange={(e) => setDateActivity(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="dateRegistration"
            value="Tanggal Pendaftaran"
            className="mb-2 block text-base"
          />

          <Datepicker
            id="dateRegistration"
            required
            type="text"
            sizing="md"
            value={dateRegistration}
            onChange={(e) => setdateRegistration(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />

          <FileInput
            id="picture"
            helperText="File harus .jpg .jpeg .png"
            // value={activityPictures}
            // onChange={(e) => setActivityPictures(e.target.files)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="file" value="File" className="mb-2 block text-base" />

          <FileInput
            id="file"
            helperText="File harus .pdf"
            // value={activityPdf}
            // onChange={(e) => setActivityPdf(e.target.files[0])}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="status"
            value="Status Kegiatan"
            className="mb-2 block text-base"
          />

          <Select
            id="status"
            required
            size={`md`}
            value={activityStatus}
            onChange={(e) => setActivityStatus(e.target.value)}
          >
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
        <JoditEditor ref={editor} />
      </div>

      <ButtonFunc className="m-3 bg-primary text-white">Simpan</ButtonFunc>
      <ButtonFunc className="bg-tan" onClick={handleReset}>
        Reset
      </ButtonFunc>
    </div>
  );
}
