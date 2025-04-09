import { Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toView } from "../../../utils/toView";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const { pathname } = useLocation();

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      setMessageError("Isi semua kolom");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email_telp", email);
    formData.append("message", message);

    try {
      setIsLoading(true);
      const res = await createFeedback(formData);
      if (res.error) {
        console.log("error", res);
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        // console.log("success", res);

        setMessageSuccess("Terimakasih atas umpan balik anda");
        setMessageError(null);
        handleReset();
        toView("top");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsChecked(false);
  };

  useEffect(() => {
    toView("top");
  }, [pathname]);

  return (
    <>
      <div className="min-h-screen py-28">
        <div className="absolute inset-0 -z-10 bg-[url('/images/bg2.svg')] bg-cover bg-no-repeat blur-md" />
        <div className={`flex w-full items-center gap-5 px-5 md:px-10 md:pb-5`}>
          <span className={`h-px flex-1 bg-primary`}></span>
          <TitleSection>Umpan Balik</TitleSection>
        </div>

        {/* alert */}
        <div className="animate-bounce md:absolute md:left-5 md:top-24 md:flex md:w-11/12">
          <AlertMessage
            className={"my-3 animate-none px-5 md:w-1/2 lg:w-1/3"}
            messageError={messageError}
            messageSuccess={messageSuccess}
            setMessageError={setMessageError}
            setMessageSuccess={setMessageSuccess}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:flex-row">
          <form
            className="flex w-full flex-col items-center gap-3 rounded-r-lg pb-10 lg:w-1/2 lg:shadow-xl lg:shadow-primary/50"
            onSubmit={handleSubmitFeedback}
          >
            <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
              <Label
                htmlFor="name"
                value="Nama "
                className="mb-2 block text-base md:text-xl"
              />
              <TextInput
                className=""
                placeholder="Nama Anda"
                autoFocus
                id="name"
                name="name"
                type="text"
                sizing="text-xl"
                required
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                value={name}
              />
            </ContainerInput>
            <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
              <Label
                htmlFor="email"
                value="Email / No Telepon"
                className="mb-2 block text-base md:text-xl"
              />
              <TextInput
                placeholder="email@gmail.com / 0812345678912"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                sizing="text-xl"
                required
                disabled={isLoading}
                value={email}
              />
            </ContainerInput>
            <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
              <Label
                htmlFor="message"
                value="Pesan"
                className="mb-2 block text-base md:text-xl"
              />
              <Textarea
                placeholder="Ketikkan saran dan masukkan anda "
                id="message"
                name="message"
                type="text"
                sizing="text-xl"
                required
                rows={4}
                className="scrollbar"
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                value={message}
              />
            </ContainerInput>

            <ContainerInput className={"md:w-3/4 lg:w-3/4"}>
              <div className="flex gap-2">
                <Checkbox
                  className="p-5"
                  value={isChecked}
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <ButtonFunc
                  className="w-full bg-primary text-base text-white disabled:cursor-no-drop disabled:bg-tan"
                  disabled={!isChecked || isLoading}
                >
                  Kirim
                </ButtonFunc>
              </div>
            </ContainerInput>
          </form>

          <div className="flex w-full flex-col items-center px-10 text-center text-primary lg:w-1/2">
            <img src="/public/images/logo-bpk.svg" className="max-h-32" />
            <h2 className="font-semibold lg:text-xl">Kementrian Kebudayaan</h2>
            <h1 className="font-bold lg:text-2xl">
              Balai Pelestarian Kebudayaan Wilayah XVIII
            </h1>
            <h2 className="font-semibold md:text-base">
              Sulawesi Tengah & Sulawesi Barat
            </h2>
            <div className="p-5">
              Jl. Gatot Subroto No.26, Besusu Tengah, Kec. Palu Timur, Kota Palu{" "}
              <br /> Sulawesi Tengah, 94111
            </div>

            <div className="text-primary md:flex md:w-full md:justify-center md:gap-5 md:px-5">
              <div className="flex">
                <span>Email</span>
                <span className="mx-2">:</span>
                <span>email@email.com</span>
              </div>
              <span className="hidden md:block">|</span>
              <div className="flex">
                <span>Telp</span>
                <span className="mx-2">:</span>
                <span>email@email.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { createFeedback } from "../../../services/feedback.service";
