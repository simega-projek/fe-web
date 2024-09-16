import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import {
  getOneArticle,
  updateArticle,
} from "../../../services/article.service";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";

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
  const [debounceDescription] = useDebounce(description, 3000); // Debounce description
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setFile(null);
    if (editorInput.current) editorInput.current.value = null;
    if (imageInput.current) imageInput.current.value = null;
    if (pdfInput.current) pdfInput.current.value = null;
  };

  const handleChangeFile = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
  };

  const handleChangeImage = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
  };

  const handleUpdateArticle = useCallback(
    async (e) => {
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
        setLoading(true);
        let res = await updateArticle(id, formData);
        if (res.error) {
          setMessageError(res.message);
          setMessageSuccess(null);
        } else {
          setMessageError(null);
          setMessageSuccess(res.message);

          if (onSuccess) {
            onSuccess();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              onClose();
              setMessageSuccess(null);
            }, 2000);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [
      title,
      description,
      image,
      file,
      originalImage,
      originalFile,
      id,
      onSuccess,
      handleReset,
    ],
  );

  const fetchOneArticle = useCallback(
    async (id) => {
      handleReset();
      setLoading(true);
      try {
        const res = await getOneArticle(id);
        const data = res?.data;
        setDataUpdate(data);
        setTitle(data?.title);
        setDescription(data?.description);
        setOriginalImage(data?.image);
        setOriginalFile(data?.file);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      fetchOneArticle(id);
    }
  }, [id, fetchOneArticle]);

  // console.log({ dataUpdate });

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
              disabled={loading}
            />
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
              helperText={`File asli: ${originalImage}`}
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
              helperText={`Gambar asli: ${originalFile}`}
              disabled={loading}
            />
          </div>
        </div>

        {/* Description Editor */}
        <div className="w-full px-3">
          <Label htmlFor="deskripsi" value="Deskripsi" />
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={(newDescription) => setDescription(newDescription)}
            disabled={loading}
          />
        </div>

        {/* Action Buttons */}
        <ButtonFunc className="m-3 bg-primary text-white" disabled={loading}>
          {loading ? "Loading" : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="bg-tan" onClick={onClose}>
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
