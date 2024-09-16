import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { getOneEvent, updateEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";

export default function UpdateActivity({
  isOpenUpdate,
  onClose,
  id,
  onSuccess,
}) {
  let controllerApi;

  const editorInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const btnCancel = useRef(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [regisLink, setRegisLink] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [originalImage, setOriginalImage] = useState(null);
  const [originalStartDate, setOriginalStartDate] = useState(null);
  const [originalEndDate, setOriginalEndDate] = useState(null);

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
  };

  const handleInputJodit = useCallback((newDescription) => {
    setDescription(newDescription);
  }, []);

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setRegisLink("");
    setStatus("");
    setImage(null);
    setStartDate(null);
    setEndDate(null);
    if (editorInputRef.current) editorInputRef.current.value = null;
    if (imageInputRef.current) imageInputRef.current.value = null;
    if (endDateRef.current) endDateRef.current.value = null;
    if (startDateRef.current) startDateRef.current.value = null;
  };

  const handleUpdateActivity = useCallback(
    async (e) => {
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
      } else if (description.trim() === "" || !description) {
        setMessageError("Deskripsi kegiatan diisi");
        toView("top");
        return;
      }

      const currentDate = new Date().toISOString();

      const formattedStartDate = startDate
        ? new Date(startDate).toISOString()
        : currentDate;
      const formattedEndDate = endDate
        ? new Date(endDate).toISOString()
        : currentDate;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image || originalImage);
      formData.append("registration_link", regisLink);
      formData.append("start_date", formattedStartDate);
      formData.append("end_date", formattedEndDate);
      formData.append("status", status);

      // console.log("data update: ", formData);

      try {
        setIsLoading(true);
        const res = await updateEvent(id, formData);
        // console.log("response update event: ", res);
        if (res.error) {
          setMessageError(res.message);
          setMessageSuccess(null);
          toView("top");
        } else {
          setMessageError(null);
          setMessageSuccess(res.message);
          toView("top");

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
    },
    [
      title,
      description,
      image,
      regisLink,
      startDate,
      endDate,
      status,
      originalEndDate,
      originalImage,
      originalStartDate,
      id,
      onSuccess,
      handleResetForm,
    ],
  );

  const fetchOneEvent = useCallback(
    async (id) => {
      handleResetForm();
      setIsLoading(true);
      try {
        const res = await getOneEvent(id);
        const data = res.data;
        setDataUpdate(data);
        // console.log("res fecth one event :", res);

        setTitle(data?.title);
        setDescription(data?.description);
        setRegisLink(data?.registration_link);
        setStatus(data?.status);
        setOriginalImage(data?.image);
        setStartDate(
          data?.start_date
            ? new Date(data.start_date).toISOString().split("T")[0]
            : "",
        );
        setEndDate(
          data?.end_date
            ? new Date(data.end_date).toISOString().split("T")[0]
            : "",
        );
        // console.log({ startDate, endDate });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      fetchOneEvent(id);
    }
  }, [id, fetchOneEvent]);

  // console.log("input", {
  //   title,
  //   description,
  //   image,
  //   regisLink,
  //   status,
  //   startDate,
  //   endDate,
  // });

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Ubah Data Kegiatan</TitleSection>
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
      <form onSubmit={handleUpdateActivity} className="flex flex-wrap">
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

          <input
            type="date"
            className="w-full rounded-md"
            id="startDate"
            name="start_date"
            required
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="endDate"
            value="Selesai Kegiatan"
            className="mb-2 block text-base"
          />

          <input
            type="date"
            className="w-full rounded-md"
            min={startDate}
            id="endDate"
            name="end_date"
            required
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
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
            helperText={originalImage}
            onChange={handleChangeImage}
            accept="image/*"
            ref={imageInputRef}
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
            ref={editorInputRef}
            value={description}
            onChange={handleInputJodit}
          />
        </div>

        <ButtonFunc className="m-3 bg-primary text-white" disabled={isLoading}>
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="m-3 bg-tan" useRef={btnCancel} onClick={onClose}>
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
