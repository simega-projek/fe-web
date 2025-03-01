import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { createArticle } from "../../../services/article.service";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { toView } from "../../../utils/toView";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";
import { set } from "date-fns";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";

export default function CreateArticle({ isOpenCreate, onSuccess, onClose }) {
  const editorInput = useRef(null);
  const imageInput = useRef(null);
  const pdfInput = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [debounceDescription] = useDebounce(description, 800);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setFile(null);
    if (editorInput.current) {
      editorInput.current.value = null;
    }
    if (imageInput.current) {
      setImagePreview(null);
      imageInput.current.value = null;
    }
    if (pdfInput.current) {
      pdfInput.current.value = null;
    }
  };
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
    if (imageInput.current) {
      imageInput.current.value = null;
    }
  };
  // console.log("editor: ", editor.current);
  // console.log("desc: ", debounceDescription);

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    // console.log(title);
    if (title.trim() === "" || !title) {
      setMessageError("Judul artikel diisi");
      toView("top");
      return;
    } else if (!file) {
      setMessageError("File artikel diisi");
      toView("top");
      return;
    } else if (!image) {
      setMessageError("Gambar artikel diisi");
      toView("top");
      return;
    } else if (description.trim() === "" || !description) {
      setMessageError("Deskripsi artikel diisi");
      toView("top");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("file", file);
    try {
      setIsLoading(true);
      let res = await createArticle(formData);
      console.log(res);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        toView("top");
        onSuccess();
        handleReset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpenCreate === false) {
      handleReset();
    }
  }, [isOpenCreate]);

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="mb-2 flex justify-between">
        <TitleSection className="underline">Tambah Objek</TitleSection>
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
      <form onSubmit={handleCreateArticle} className="flex flex-wrap">
        <ContainerInput>
          <Label
            htmlFor="title"
            value="Title"
            className="mb-2 block text-base"
          />
          <TextInput
            required
            name="title"
            autoFocus
            id="title"
            type="text"
            sizing="md"
            placeholder="Artikel terkini hari ini"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="file" value="File" className="mb-2 block text-base" />
          <FileInput
            id="file"
            name="file"
            helperText="File harus .pdf"
            onChange={handleChangeFile}
            accept="application/pdf"
            ref={pdfInput}
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
          <Label
            htmlFor="image"
            value="Gambar"
            className="mb-2 block text-base"
          />

          <FileInput
            id="image"
            name="image"
            helperText="File harus .jpg .jpeg .png"
            onChange={handleChangeImage}
            accept="image/*"
            multiple
            ref={imageInput}
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
          {imagePreview && (
            <ImagePreview src={imagePreview} onClose={handleClosePreview} />
          )}
        </ContainerInput>

        <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={(newDescription) => setDescription(newDescription)}
            disabled={isLoading}
          />
        </div>

        <ButtonFunc
          className="m-3 bg-primary text-white disabled:cursor-no-drop"
          disabled={isLoading}
        >
          Simpan
        </ButtonFunc>

        <ButtonFunc
          className="m-3 bg-tan disabled:cursor-no-drop"
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </ButtonFunc>
      </form>
    </div>
  );
}
