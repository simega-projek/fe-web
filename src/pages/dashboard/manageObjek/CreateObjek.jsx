import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import ManyInputText from "../../../components/Elements/Inputs/ManyInputText";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { getAllCategory } from "../../../services/category.service";
import { createObject } from "../../../services/object.service"; // API untuk create object
import { getAllSite } from "../../../services/site.service";
import { toView } from "../../../utils/toView";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";
import { useDebounce } from "use-debounce";

export default function CreateObjek({ isOpenCreate, onSuccess, onClose }) {
  const editorInput = useRef("");
  const imageRef = useRef(null);

  const [nameObject, setNameObject] = useState("");
  const [lintang, setLintang] = useState("");
  const [bujur, setBujur] = useState("");
  const [valley, setValley] = useState("");
  const [videos, setVideos] = useState([]); //multiple video
  const [image, setImage] = useState(null);
  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [debounceDescription] = useDebounce(description, 800);

  const [siteData, setSiteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleReset = () => {
    setNameObject("");
    setLintang("");
    setBujur("");
    setValley("");
    setVideos([]);
    setSelectedSite(0);
    setSelectedCategory(0);
    setDescription("");
    setImage(null);
    setImagePreview(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }

    toView("top");
  };

  const handleImageChange = (e) => {
    const selectFile = e.target.files[0];
    setImage(selectFile);
    if (selectFile) setImagePreview(URL.createObjectURL(selectFile));
  };

  const handleClosePreview = () => {
    setImagePreview(null);
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const categories = await getAllCategory();
      setCategoryData(categories?.data);

      const sites = await getAllSite();
      setSiteData(sites?.data);
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
      !image ||
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
    formData.append("gambar", image);

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
      handleReset();
    }
  }, [isOpenCreate]);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(image);
  // console.log(image);
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

      {/* Form */}
      <form onSubmit={handleCreateObject} className="flex flex-wrap">
        <ContainerInput>
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
            placeholder="Patung Palindo"
            onChange={(e) => setNameObject(e.target.value)}
            required
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
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
            value={selectedCategory}
          >
            <option>Pilih Kategori</option>
            {categoryData?.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.category}
              </option>
            ))}
          </select>
        </ContainerInput>

        <ContainerInput>
          <Label
            htmlFor="garisLintang"
            value="Garis Lintang"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisLintang"
            type="text"
            sizing="md"
            placeholder="-0.9052080924767166"
            value={lintang}
            onChange={(e) => setLintang(e.target.value)}
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
          <Label
            htmlFor="garisBujur"
            value="Garis Bujur"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisBujur"
            type="text"
            sizing="md"
            placeholder="119.85368178963921"
            value={bujur}
            onChange={(e) => setBujur(e.target.value)}
            disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput>
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
        </ContainerInput>

        <ContainerInput>
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
            value={selectedSite}
          >
            <option>Pilih Situs</option>
            {siteData?.map((site) => (
              <option key={site?.ID} value={site?.ID}>
                {site?.nama_situs}
              </option>
            ))}
          </select>
        </ContainerInput>

        <ContainerInput>
          <Label
            htmlFor="picture"
            value="Gambar Thumbnail"
            className="mb-2 block text-base"
          />
          <FileInput
            onChange={handleImageChange}
            accept="image/*"
            disabled={isLoading}
            ref={imageRef}
          />
          <small className="text-light">
            File harus berformat .jpg, .jpeg, .png
          </small>
        </ContainerInput>

        <ContainerInput>
          {imagePreview && (
            <ImagePreview src={imagePreview} onClose={handleClosePreview} />
          )}
        </ContainerInput>

        {/* <ContainerInput>
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
        </ContainerInput> */}

        <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={(newContent) => setDescription(newContent)}
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
