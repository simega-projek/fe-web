import React from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { MultiInputImage } from "../../../components/Elements/Inputs/MultiInputImage";

export const ComplaintPage = () => {
  return (
    <div className="min-h-screen py-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/bg2.svg')] bg-cover bg-no-repeat blur-md" />

      <div className="flex w-full items-center gap-5 px-5 md:px-10">
        <span className="h-px flex-1 bg-primary"></span>
        <TitleSection>Pengaduan Masyarakat</TitleSection>
      </div>

      <form
        className="flex w-full flex-col items-center gap-3 rounded-r-lg pb-10 lg:w-1/2 lg:shadow-xl lg:shadow-primary/50"
        // onSubmit={handleSubmitFeedback}
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
            // onChange={(e) => setName(e.target.value)}
            // disabled={isLoading}
            // value={name}
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
            // onChange={(e) => setAddress(e.target.value)}
            // disabled={isLoading}
            // value={address}
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

            // className="text-lg"
            // onChange={(e) => setProfession(e.target.value)}
            // disabled={isLoading}
            // value={profession}
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
            // onChange={(e) => setMessage(e.target.value)}
            // disabled={isLoading}
            // value={message}
          />
        </ContainerInput>

        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <Label
            htmlFor="message"
            value="Gambar Bukti"
            className="mb-2 block text-base md:text-xl"
          />
          <MultiInputImage />
        </ContainerInput>

        <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
          <div className="flex gap-2">
            <Checkbox
              className="p-5"
              // value={isChecked}
              // checked={isChecked}
              // onChange={(e) => setIsChecked(e.target.checked)}
            />
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
