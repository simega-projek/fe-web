import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { getOneEvent, updateEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";

export default function UpdateActivity2({
  isOpenUpdate,
  onClose,
  id,
  onSuccess,
}) {
  const editorInputRef = useRef(null);
  const imageInputRef = useRef(null);

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
  const [originalImage, setOriginalImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
    if (selectFile) setImagePreview(URL.createObjectURL(selectFile));
  };

  const handleClosePreview = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleResetForm = () => {
    setTitle("");
    setDescription("");
    setRegisLink("");
    setStatus("");
    setImage(null);
    setStartDate("");
    setEndDate("");
    if (editorInputRef.current) editorInputRef.current.value = null;
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleUpdateActivity = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessageError("Judul kegiatan diisi");
      return;
    }
    if (!regisLink.trim()) {
      setMessageError("Link pendaftaran diisi");
      return;
    }
    if (!description.trim()) {
      setMessageError("Deskripsi kegiatan diisi");
      return;
    }

    toView("top");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image ? image : originalImage);
    formData.append("registration_link", regisLink);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", status);

    console.log("Data yang akan dikirim:", {
      title,
      description,
      image: image ? image.name : originalImage,
      regisLink,
      startDate,
      endDate,
      status,
    });

    try {
      setIsLoading(true);
      const res = await updateEvent(id, formData);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        if (onSuccess) {
          onSuccess();
          setTimeout(() => {
            onClose();
            setMessageSuccess(null);
          }, 2000);
        }
      }
      toView("top");
    } catch (err) {
      console.log(err);
      setMessageError("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneEvent = async (id) => {
    handleResetForm();
    setIsLoading(true);
    try {
      const res = await getOneEvent(id);
      const data = res.data;
      setTitle(data?.title);
      setDescription(data?.description);
      setRegisLink(data?.registration_link);
      setStatus(data?.status);
      setOriginalImage(data?.image);
      setImagePreview(data?.image);
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
    } catch (err) {
      console.log(err);
      setMessageError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOneEvent(id);
    }
  }, [id]);

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Ubah Data Kegiatan</TitleSection>
        <hr className="my-5" />
        <Button color="red" onClick={onClose}>
          X
        </Button>
      </div>

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

      <form onSubmit={handleUpdateActivity} className="flex flex-wrap">
        <ContainerInput>
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
        </ContainerInput>

        <ContainerInput>
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
        </ContainerInput>

        <ContainerInput>
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
        </ContainerInput>

        <ContainerInput>
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
        </ContainerInput>

        <ContainerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />
          <FileInput
            id="picture"
            onChange={handleChangeImage}
            accept="image/*"
            ref={imageInputRef}
            disabled={isLoading}
          />
          <p className="truncate text-xs text-gray-400">
            File asli: {originalImage}
          </p>
          {imagePreview && (
            <ImagePreview src={imagePreview} onClose={handleClosePreview} />
          )}
        </ContainerInput>

        <ContainerInput>
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
        </ContainerInput>

        <div className="mt-2 w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInputRef}
            value={description}
            onChange={setDescription}
          />
        </div>

        <ButtonFunc className="m-3 bg-primary text-white" disabled={isLoading}>
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="m-3 bg-tan" onClick={onClose}>
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
