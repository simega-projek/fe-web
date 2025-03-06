import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";
import {
  getOneArticle,
  updateArticle,
} from "../../../services/article.service";
import { toView } from "../../../utils/toView";

export default function UpdateArticle({
  isOpenUpdate,
  onSuccess,
  id,
  onClose,
}) {
  const editorInput = useRef(null);
  const imageInput = useRef(null);
  const pdfInput = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [debounceDescription] = useDebounce(description, 800); // Debounce description
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChangeFile = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
  };

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
    if (selectFile) setImagePreview(URL.createObjectURL(selectFile));
  };

  const handleClosePreview = () => {
    setImagePreview(null);
    setImage(null);
    if (!imageInput.current) imageInput.current.value = null;
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || !title) {
      setMessageError("Judul artikel harus diisi");
      return;
    } else if (description.trim() === "" || !description) {
      setMessageError("Deskripsi artikel harus diisi");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image || originalImage);
    formData.append("file", file || originalFile);

    try {
      setIsLoading(true);
      let res = await updateArticle(id, formData);
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

        toView("top");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneArticle = async () => {
    // handleReset();
    setIsLoading(true);
    try {
      const res = await getOneArticle(id);
      const data = res?.data;
      setTitle(data?.title);
      setDescription(data?.description);
      setOriginalImage(data?.image);
      setOriginalFile(data?.file);
      setImagePreview(data?.image);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOneArticle();
  }, [id]);

  // console.log({ dataUpdate });
  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Ubah Berita & Artikel</TitleSection>
        <Button color="red" onClick={onClose}>
          X
        </Button>
      </div>
      <hr className="my-5" />

      {/* Alert */}
      {messageError && (
        <FailAllert setMessageError={setMessageError}>
          {messageError}
        </FailAllert>
      )}
      {messageSuccess && (
        <SuccessAlert setMessageSuccess={setMessageSuccess}>
          {messageSuccess}
        </SuccessAlert>
      )}

      {/* Form */}
      <form onSubmit={handleUpdateArticle}>
        <div className="flex flex-wrap">
          {/* Title Input */}
          <div className="w-full px-3 lg:w-1/2">
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* File Input */}
          <div className="w-full px-3 lg:w-1/2">
            <Label htmlFor="file" value="File" />
            <FileInput
              id="file"
              name="file"
              accept="application/pdf"
              onChange={handleChangeFile}
              ref={pdfInput}
              disabled={isLoading}
            />
            <p className="truncate text-xs text-gray-400">
              File asli: ${originalFile}
            </p>
          </div>

          {/* Image Input */}
          <div className="w-full px-3 lg:w-1/2">
            <Label htmlFor="image" value="Gambar" />
            <FileInput
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
            />
            <p className="truncate text-xs text-gray-400">
              File asli: ${originalImage}
            </p>
          </div>
          {imagePreview && (
            <ImagePreview src={imagePreview} onClose={handleClosePreview} />
          )}
        </div>

        {/* Description Editor */}
        <div className="w-full px-3 pt-5">
          <Label htmlFor="deskripsi" value="Deskripsi" />
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={(newDescription) => setDescription(newDescription)}
            disabled={isLoading}
          />
        </div>

        {/* Action Buttons */}
        <ButtonFunc
          className="m-3 bg-primary text-white disabled:cursor-no-drop"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="bg-tan" onClick={handleBtnCancel}>
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
