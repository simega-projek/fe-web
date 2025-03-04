import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";
import { getOneEvent, updateEvent } from "../../../services/event.service";
import { toView } from "../../../utils/toView";

export default function UpdateActivity({
  id,
  isOpenUpdate,
  onClose,
  onSuccess,
}) {
  const editorInput = useRef(null);
  const imageInput = useRef(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [regisLink, setRegisLink] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const [debounceDescription] = useDebounce(description, 800);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
    if (selectFile) setImagePreview(URL.createObjectURL(selectFile));
  };

  const handleClosePreview = () => {
    setImagePreview(null);
    setImage(null);
    if (imageInput.current) {
      imageInput.current.value = null;
    }
  };

  const handleInputJodit = (desc) => {
    setDescription(desc);
  };

  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  const validateForm = () => {
    if (title.trim() === "" || !title) {
      setMessageError("Judul kegiatan diisi");
      toView("top");
      return false;
    } else if (regisLink.trim() === "" || !title) {
      setMessageError("Link pendaftaran diisi");
      toView("top");
      return false;
    } else if (description.trim() === "" || !description) {
      setMessageError("Deskripsi kegiatan diisi");
      toView("top");
      return false;
    }
    toView("top");
    return true;
  };

  const handleUpdateActivity = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    console.log("form data: ", formData);
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
  };

  const fetchOneEvent = async () => {
    setIsLoading(true);
    try {
      const res = await getOneEvent(id);
      const data = res?.data;
      setTitle(data.title);
      setRegisLink(data.registration_link);
      setStartDate(
        data.start_date
          ? new Date(data.start_date).toISOString().split("T")[0]
          : "",
      );
      setEndDate(
        data.end_date
          ? new Date(data.end_date).toISOString().split("T")[0]
          : "",
      );
      setImage(data.image);
      setImagePreview(data.image);
      setStatus(data.status);
      setDescription(data.description);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOneEvent();
  }, [id]);

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="mb-2 flex justify-between">
        <TitleSection className="underline">Edit Kegiatan</TitleSection>
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
            placeholder="Kegiatan Hari ini"
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
            placeholder="https://forms.gle/MUKWvwvoyz6oaLEC8"
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
            className="w-full rounded-md"
            type="date"
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
            helperText="File harus .jpg .jpeg .png"
            onChange={handleChangeImage}
            accept="image/*"
            ref={imageInput}
            disabled={isLoading}
          />

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
            onChange={handleInputJodit}
            ref={editorInput}
            value={debounceDescription}
          />
        </div>

        <ButtonFunc
          className="m-3 bg-primary text-white disabled:cursor-no-drop"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="m-3 bg-tan" onClick={handleBtnCancel}>
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
