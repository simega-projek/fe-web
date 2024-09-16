import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { InputMany } from "../../../components/Elements/Inputs/InputMany";
import { getAllSite } from "../../../services/site.service";
import { getAllCategory } from "../../../services/category.service";
import { createObject } from "../../../services/object.service"; // API untuk create object
import ManyInputImage from "../../../components/Elements/Inputs/ManyInputImage";
import ManyInputText from "../../../components/Elements/Inputs/ManyInputText";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { toView } from "../../../utils/toView";

export default function CreateObjek({ isOpenCreate, onSuccess }) {
  const editorInput = useRef(null);
  const imageRef = useRef(null);

  const [nameObject, setNameObject] = useState("");
  const [lintang, setLintang] = useState("");
  const [bujur, setBujur] = useState("");
  const [valley, setValley] = useState("");
  const [videos, setVideos] = useState([]); //multiple video
  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [description, setDescription] = useState("");

  const [video, setVideo] = useState("");

  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  const [siteData, setSiteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [resetManyInput, setResetManyInput] = useState(false);

  const handleReset = () => {
    setNameObject("");
    setLintang("");
    setBujur("");
    setValley("");
    setVideos([]);
    setSelectedSite(0);
    setSelectedCategory(0);
    setDescription("");
    setImages([]);

    setResetManyInput((prev) => !prev); // Toggle state untuk reset ManyInputText
    if (editorInput.current) {
      editorInput.current.value = null;
    }
    if (editorInput.current) {
      editorInput.current.value = null;
    }
    if (imageRef.current) {
      imageRef.current.value = null;
    }

    toView("top");
  };

  const fetchSite = async () => {
    setIsLoading(true);
    try {
      const sites = await getAllSite();
      setSiteData(sites?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const categories = await getAllCategory();
      setCategoryData(categories?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(+selectedCategory);
  };

  const handleSiteChange = (e) => {
    const selectedSite = e.target.value;
    setSelectedSite(+selectedSite);

    const site = siteData.find((s) => s.ID === +selectedSite);
    setValley(site?.lembah?.lembah);
  };
  const handleImagesChange = (e) => {
    const selectFile = e.target.files[0];
    setImages(selectFile);
  };

  const handleVideosChange = (values) => {
    setVideos(values);
  };

  const handleCreateObject = async (e) => {
    e.preventDefault();

    if (
      nameObject.trim() === "" ||
      !nameObject ||
      lintang.trim() === "" ||
      !lintang ||
      bujur.trim() === "" ||
      !bujur ||
      description.trim() === "" ||
      !description ||
      !selectedSite ||
      !selectedCategory
    ) {
      setMessageError("Isi semua data terlebih dahulu");
      setMessageSuccess(null);
      toView("top");
      return;
    }

    const formData = new FormData();
    formData.append("nama_objek", nameObject);
    formData.append("lintang", lintang);
    formData.append("bujur", bujur);
    formData.append("deskripsi", description);
    formData.append("site_id", selectedSite);
    formData.append("category_id", selectedCategory);
    formData.append("video", videos);
    formData.append("gambar", images);

    setIsLoading(true);
    try {
      const res = await createObject(formData);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageSuccess(res.message);
        setMessageError(null);
        onSuccess();
        handleReset();
      }
      toView("top");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessageError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpenCreate === false) {
      // Reset semua input ketika form tertutup
      setNameObject("");
      setLintang("");
      setBujur("");
      setValley("");
      setImages([]);
      setVideos([]);
      setSelectedSite(0);
      setSelectedCategory(0);
      setDescription("");
    }
  }, [isOpenCreate]);

  useEffect(() => {
    fetchSite();
    fetchCategory();
  }, []);

  // console.log(image);
  // console.log(images);
  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <TitleSection className="underline">Tambah Objek Megalit</TitleSection>
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

      {/* Form */}
      <form onSubmit={handleCreateObject} className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="objek"
            value="Nama Objek"
            className="mb-2 block text-base"
          />
          <TextInput
            id="objek"
            type="text"
            sizing="md"
            value={nameObject}
            placeholder="name objek"
            onChange={(e) => setNameObject(e.target.value)}
            required
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="category"
            value="Kategory"
            className="mb-2 block text-base"
          />
          <select
            id="category"
            className="w-full rounded-md"
            onChange={handleCategoryChange}
            disabled={isLoading}
          >
            <option>Pilih Kategori</option>
            {categoryData.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.category}
              </option>
            ))}
          </select>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="garisLintang"
            value="Garis Lintang"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisLintang"
            type="text"
            sizing="md"
            value={lintang}
            onChange={(e) => setLintang(e.target.value)}
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="garisBujur"
            value="Garis Bujur"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisBujur"
            type="text"
            sizing="md"
            value={bujur}
            onChange={(e) => setBujur(e.target.value)}
            disabled={isLoading}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="lembah"
            value="Lembah"
            className="mb-2 block text-base"
          />
          <TextInput
            id="lembah"
            type="text"
            sizing="md"
            value={valley}
            disabled
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="situs"
            value="Situs"
            className="mb-2 block text-base"
          />
          <select
            id="situs"
            className="w-full rounded-md"
            onChange={handleSiteChange}
            disabled={isLoading}
          >
            <option>Pilih Situs</option>
            {siteData.map((site) => (
              <option key={site?.ID} value={site?.ID}>
                {site?.nama_situs}
              </option>
            ))}
          </select>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />
          {/* <ManyInputImage onImagesChange={setImages} /> */}
          <FileInput
            onChange={handleImagesChange}
            accept="image/*"
            disabled={isLoading}
            ref={imageRef}
          />
          <small className="text-light">
            File harus berformat .jpg, .jpeg, .png
          </small>
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="video"
            value="Link Video"
            className="mb-2 block text-base"
          />
          <ManyInputText
            onTextsChange={setVideos}
            disabled={isLoading}
            onReset={resetManyInput}
          />
        </CountenerInput>

        <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={description}
            onBlur={(newContent) => setDescription(newContent)}
            disabled={isLoading}
          />
        </div>

        <ButtonFunc
          className="m-3 bg-primary text-white"
          onClick={handleCreateObject}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc className="m-3 bg-tan" onClick={handleReset} type="reset">
          Reset
        </ButtonFunc>
      </form>
    </div>
  );
}
