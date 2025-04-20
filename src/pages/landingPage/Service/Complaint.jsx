import React, { useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { MultiInputImage } from "../../../components/Elements/Inputs/MultiInputImage";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";

export const ComplaintPage = () => {
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    profession: "",
    message: "",
    images: [],
  });

  const handleImagesChange = (files) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form (tambahkan di sini jika diperlukan)

    const formInput = new FormData();
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((image) => formInput.append("images", image));
      } else {
        formInput.append(key, formData[key]);
      }
    }

    const inputData = {};
    formInput.forEach((value, key) => {
      inputData[key] = value;
    });

    // Kirim data ke server
    // alert("Terkirim");
    // console.log(inputData);
  };

  return (
    <div className="min-h-screen py-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/bg2.svg')] bg-cover bg-no-repeat blur-md" />

      <div className="flex w-full items-center gap-5 px-5 md:px-10">
        <span className="h-px flex-1 bg-primary"></span>
        <TitleSection>Pengaduan Masyarakat</TitleSection>
      </div>

      {/* alert */}
      <div className="md:absolute md:left-5 md:top-24 md:flex md:w-11/12">
        <AlertMessage
          className={"my-3 px-5 sm:animate-none md:w-1/2 lg:w-1/3"}
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />
      </div>

      <form
        className="flex w-full flex-col items-center gap-3 rounded-r-lg pb-10 lg:w-2/3 lg:shadow-xl lg:shadow-primary/50"
        onSubmit={handleSubmit}
      >
        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="name"
            value="Nama "
            className="mb-2 block text-base md:text-xl"
          />
          <TextInput
            className="text-2xl"
            placeholder="Nama Lengkap"
            autoFocus
            id="name"
            name="name"
            type="text"
            sizing="text-2xl"
            required
            onChange={handleChange}
            value={formData.name}
            // disabled={isLoading}
          />
        </ContainerInput>
        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="address"
            value="Alamat"
            className="mb-2 block text-base md:text-xl"
          />
          <TextInput
            placeholder="kota palu"
            id="address"
            name="address"
            type="text"
            sizing="text-xl"
            required
            onChange={handleChange}
            value={formData.address}
            // disabled={isLoading}
          />
        </ContainerInput>
        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="profession"
            value="Profesi"
            className="mb-2 block text-base md:text-xl"
          />
          <TextInput
            placeholder="Karyawan Swasta"
            id="profession"
            name="profession"
            type="text"
            sizing="text-xl"
            required
            onChange={handleChange}
            value={formData.profession}
            // disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="message"
            value="Laporan"
            className="mb-2 block text-base md:text-xl"
          />
          <Textarea
            placeholder="Ketikkan saran dan masukkan anda "
            id="message"
            name="message"
            type="text"
            required
            rows={4}
            className="scrollbar text-md"
            onChange={handleChange}
            value={formData.message}
            // disabled={isLoading}
          />
        </ContainerInput>

        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="images"
            value="Gambar Bukti"
            className="mb-2 block text-base md:text-xl"
          />
          <MultiInputImage onImagesChange={handleImagesChange} />
          <span className="text-sm italic">
            Ukuran gambar maksimal 500 KB dan harus .jpg .jpeg .png
          </span>
        </ContainerInput>

        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <div className="flex gap-2">
            <ButtonFunc
              className="w-full bg-primary text-base text-white disabled:cursor-no-drop disabled:bg-tan"
              // disabled={!isChecked || isLoading}
            >
              Kirim
            </ButtonFunc>
          </div>
        </ContainerInput>
      </form>
    </div>
  );
};
