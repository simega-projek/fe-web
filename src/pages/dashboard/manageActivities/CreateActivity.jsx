import React, { useCallback, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  Button,
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
import { createEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";

export default function CreateActivity({ isOpenCreate, onClose, onSuccess }) {
  let controllerApi;

  const editorInput = useRef(null);
  const imageInput = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const btnCancel = useRef(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [regisLink, setRegisLink] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date);
  };

  const handleInputJodit = useCallback((newDescription) => {
    setDescription(newDescription);
  }, []);

  const handleResetForm = () => {
    // if (btnCancel.current.value === "Batal") {
    //   if (controllerApi) {
    //     controllerApi.abort();
    //     setMessageError("Simpan kegiatan dibatalkan");
    //     setMessageSuccess(null);
    //     return;
    //   }
    // } else {
    setTitle("");
    setDescription("");
    setRegisLink("");
    setStatus("");
    setImage(null);
    setStartDate(null);
    setEndDate(null);
    if (editorInput.current) editorInput.current.value = null;
    if (imageInput.current) imageInput.current.value = null;
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();

    controllerApi = new AbortController();
    if (title.trim() === "" || !title) {
      setMessageError("Judul kegiatan diisi");
      toView("top");
      return;
    } else if (regisLink.trim() === "" || !title) {
      setMessageError("Link pendaftaran diisi");
      toView("top");
      return;
    } else if (!image) {
      setMessageError("Gambar kegiatan diisi");
      toView("top");
      return;
    } else if (description.trim() === "" || !description) {
      setMessageError("Deskripsi kegiatan diisi");
      toView("top");
      return;
    }

    const currentDate = new Date().toISOString();
    // const formattedStartDate = startDate
    //   ? new Date(startDate).toISOString()
    //   : currentDate;
    // const formattedEndDate = endDate
    //   ? new Date(endDate).toISOString()
    //   : currentDate;

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString()
      : currentDate;
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString()
      : currentDate;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("registration_link", regisLink);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("status", status);
    console.log("form data: ", formData);
    try {
      setIsLoading(true);
      const res = await createEvent(formData, { signal: controllerApi.signal });
      console.log("response create event: ", res);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        toView("top");
        handleResetForm();
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("start date state: ", startDate.target.defaultValue);
  console.log(
    "start date state: ",
    startDate ? new Date().toISOString() : null,
  );
  console.log("end date state: ", endDate);
  console.log("start date ref: ", startDateRef.current);
  console.log("end date ref: ", endDateRef.current);

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Tambah Kegiatan</TitleSection>
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
      <form onSubmit={handleCreateActivity} className="flex flex-wrap">
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
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="regisLink"
            value="Link Pendaftaran"
            className="mb-2 block text-base"
          />

          <TextInput
            id="regisLink"
            name="registration_link"
            required
            type="text"
            sizing="md"
            value={regisLink}
            onChange={(e) => setRegisLink(e.target.value)}
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="startDate"
            value="Tanggal Kegiatan"
            className="mb-2 block text-base"
          />

          <Datepicker
            ref={startDateRef}
            onSelect={(e) => setStartDate(e)}
            id="startDate"
            name="start_date"
            required
            type="text"
            sizing="md"
            onChange={(date) => setStartDate(date)}
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="endDate"
            value="Selesai Kegiatan"
            className="mb-2 block text-base"
          />

          <Datepicker
            ref={endDateRef}
            id="endDate"
            required
            type="text"
            sizing="md"
            name="end_date"
            // onChange={(date) => setEndDate(date.toISOString())}
            onChange={(date) => setEndDate(date)}
            disabled={isLoading}
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
            onChange={handleChangeImage}
            accept="image/*"
            ref={imageInput}
            disabled={isLoading}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isLoading}
          >
            <option value={"Akan Datang"}>Akan Datang</option>
            <option value={"Proses"}>Proses</option>
            <option value={"Selesai"}>Selesai</option>
          </Select>
        </CountenerInput>

        <div className="mt-2 w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={description}
            onChange={handleInputJodit}
          />
        </div>

        <ButtonFunc className="m-3 bg-primary text-white" disabled={isLoading}>
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc
          className="m-3 bg-tan"
          useRef={btnCancel}
          onClick={handleResetForm}
        >
          {isLoading ? "Batal" : "Reset"}
        </ButtonFunc>
      </form>
    </div>
  );
}
