import { FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { createArticle } from "../../../services/article.service";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { toView } from "../../../utils/toView";

export default function CreateArticle({ isOpenCreate, onSuccess }) {
  const editorInput = useRef(null);
  const imageInput = useRef(null);
  const pdfInput = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [debounceDescription] = useDebounce(description, 1000);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    // e.preventDefault();
    setTitle("");
    setDescription("");
    setImage(null);
    setFile(null);
    if (editorInput.current) {
      editorInput.current.value = null;
    }
    if (imageInput.current) {
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
  };
  // console.log("editor: ", editor.current);
  // console.log("desc: ", debounceDescription);

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    console.log(title);
    if (title.trim() === "" || !title) {
      setMessageError("Judul artikel diisi");
      toView("top");
      return;
    } else if (description.trim() === "" || !description) {
      setMessageError("Deskripsi artikel diisi");
      toView("top");
      return;
    } else if (!image && !file) {
      setMessageError("Gambar atau PDF artikel diisi");
      toView("top");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("file", file);
    try {
      setLoading(true);
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

        if (onSuccess) {
          onSuccess();
          handleReset();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Berita & Artikel</TitleSection>
      <hr className="my-5" />

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
      <form onSubmit={handleCreateArticle}>
        <div className="flex flex-wrap">
          <div className="w-full px-3 lg:w-1/2">
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" className="text-base" />
              </div>
              <TextInput
                required
                name="title"
                autoFocus
                id="title"
                type="text"
                sizing="md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="w-full px-3 lg:w-1/2">
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Gambar" className="text-base" />
              </div>
              <FileInput
                id="image"
                name="image"
                helperText="File harus .jpg .jpeg .png"
                onChange={handleChangeImage}
                accept="image/*"
                ref={imageInput}
                disabled={loading}
              />
            </div>
          </div>

          <div className="w-full px-3 lg:w-1/2">
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="file" value="File" className="text-base" />
              </div>
              <FileInput
                id="file"
                name="file"
                helperText="File harus .pdf"
                onChange={handleChangeFile}
                accept="application/pdf"
                ref={pdfInput}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={(newDescription) => setDescription(newDescription)}
            disabled={loading}
          />
        </div>

        {/* <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="text-base">
            Deskripsi
          </Label>
          <Textarea
            name="description"
            autoFocus
            id="description"
            type="text"
            sizing="md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div> */}

        <ButtonFunc className="m-3 bg-primary text-white" disabled={loading}>
          Simpan
        </ButtonFunc>

        <ButtonFunc className="bg-tan" onClick={handleReset}>
          Reset
        </ButtonFunc>
      </form>
    </div>
  );
}
