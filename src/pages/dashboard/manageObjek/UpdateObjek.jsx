import { Button, FileInput, Label, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import ImagePreview from "../../../components/Fragments/Cards/ImagePreview";
import { getAllCategory } from "../../../services/category.service";
import { getOneObject, updateObject } from "../../../services/object.service"; // API untuk create object
import { getAllSite } from "../../../services/site.service";
import { toView } from "../../../utils/toView";

export default function UpdateObjek({ isOpenUpdate, onSuccess, id, onClose }) {
  const editorInput = useRef(null);
  const imageRef = useRef(null);
  const role = useSelector((state) => state.auth.userData);
  let roleAuth = role?.info?.role;
  let roleProfile = role?.data?.role;
  // console.log({ roleAuth, roleProfile });

  const [nameObject, setNameObject] = useState("");
  const [lintang, setLintang] = useState("");
  const [bujur, setBujur] = useState("");
  const [valley, setValley] = useState("");
  const [videos, setVideos] = useState([]); //multiple video
  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [debounceDescription] = useDebounce(description, 800);
  const [publish, setPublish] = useState("");

  const [originalImage, setOriginalImage] = useState(null);

  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [siteData, setSiteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [resetManyInput, setResetManyInput] = useState(false);

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

  const handleInputJodit = (newDescription) => {
    setDescription(newDescription);
  };

  const handleUpdateObject = async () => {
    // e.preventDefault();

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
    formData.append("gambar", image ? image : originalImage);
    formData.append("publish", publish);

    setIsLoading(true);
    try {
      const res = await updateObject(id, formData);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageSuccess(res.message);
        setMessageError(null);
        if (onSuccess) {
          onSuccess();
          setTimeout(() => {
            onClose();
            setMessageSuccess(null);
          }, 2000);
        }
      }
      toView("top");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessageError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneObject = async () => {
    setIsLoading(true);
    try {
      const res = await getOneObject(id);
      const object = res?.data;

      setNameObject(object?.nama_objek);
      setLintang(object?.lintang);
      setBujur(object?.bujur);
      setDescription(object?.deskripsi);
      setImage(object?.gambar);
      setImagePreview(object?.gambar);
      setSelectedSite(object?.site_id);
      setSelectedCategory(object?.category_id);
      setVideos(object?.video.split(","));
      setOriginalImage(object?.gambar);
      setPublish(object?.publish);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  useEffect(() => {
    if (id) fetchOneObject();
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(image);
  // console.log(image);
  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="mb-2 flex justify-between">
        <TitleSection className="underline">Ubah Data Objek</TitleSection>
        <hr className="my-5" />
        <Button color="red" onClick={onClose}>
          X
        </Button>
      </div>

      {/* alert */}

      <AlertMessage
        messageError={messageError}
        messageSuccess={messageSuccess}
        setMessageError={setMessageError}
        setMessageSuccess={setMessageSuccess}
      />

      {/* Form */}
      <form onSubmit={handleUpdateObject} className="flex flex-wrap">
        {/* nama objek */}
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
            placeholder="name objek"
            onChange={(e) => setNameObject(e.target.value)}
            required
            disabled={isLoading}
          />
        </ContainerInput>

        {/* category */}
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

        {/* lintang */}
        <ContainerInput>
          <Label
            htmlFor="garisLintang"
            value="Garis Lintang"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisLintang"
            type="number"
            sizing="md"
            value={lintang}
            onChange={(e) => setLintang(e.target.value)}
            disabled={isLoading}
          />
        </ContainerInput>

        {/* bujur */}
        <ContainerInput>
          <Label
            htmlFor="garisBujur"
            value="Garis Bujur"
            className="mb-2 block text-base"
          />
          <TextInput
            id="garisBujur"
            type="number"
            sizing="md"
            value={bujur}
            onChange={(e) => setBujur(e.target.value)}
            disabled={isLoading}
          />
        </ContainerInput>

        {/* lembah */}
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

        {/* situs */}
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

        {/* gambar */}
        <ContainerInput>
          <Label
            htmlFor="picture"
            value="Gambar"
            className="mb-2 block text-base"
          />
          {/* <ManyInputImage onImageChange={setImage} /> */}
          <FileInput
            onChange={handleImageChange}
            accept="image/*"
            disabled={isLoading}
            ref={imageRef}
          />
          <p className="truncate text-xs text-gray-400">
            File asli: ${originalImage}
          </p>
        </ContainerInput>

        {/* publish */}
        {/* status publish */}
        {roleAuth === "superadmin" ||
        roleProfile === "superadmin" ||
        roleAuth === "validator" ||
        roleProfile === "validator" ? (
          <ContainerInput>
            <Label
              htmlFor="publish"
              value="Publish"
              className="mb-2 block text-base"
            />
            <select
              id="publish"
              className="w-full rounded-md"
              onChange={(e) => setPublish(e.target.value)}
              disabled={isLoading}
              value={publish}
            >
              <option value={"pending"}>Pending</option>
              <option value={"public"}>Publik</option>
              <option value={"private"}>Privat</option>
            </select>
          </ContainerInput>
        ) : null}

        {/* preview image */}
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
            initialTexts={videos}
          />
        </ContainerInput> */}

        <div className="w-full px-3">
          <Label htmlFor="deskripsi" className="mb-2 block text-base">
            Deskripsi
          </Label>
          <JoditEditor
            ref={editorInput}
            value={debounceDescription}
            onChange={handleInputJodit}
            disabled={isLoading}
          />
        </div>

        <ButtonFunc
          className="m-3 bg-primary text-white disabled:cursor-no-drop"
          onClick={handleUpdateObject}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>
        <ButtonFunc
          className="m-3 bg-tan"
          onClick={handleBtnCancel}
          type="button"
        >
          Batal
        </ButtonFunc>
      </form>
    </div>
  );
}
