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
  const [messageSuccess, setMessageSuccess] = useState(
    "Terimakasih atas umpan balik anda",
  );

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
      <div className="min-h-screen bg-[url('/images/bg2.svg')] bg-no-repeat py-20 pt-28">
        <div className={`flex w-full items-center gap-5 px-5 md:px-10 md:pb-5`}>
          <span className={`h-px flex-1 bg-primary`}></span>
          <TitleSection>Umpan Balik</TitleSection>
        </div>

        {/* alert */}
        <div className="md:absolute md:left-5 md:top-24 md:flex md:w-11/12">
          <AlertMessage
            className={"my-3 animate-bounce px-5 md:w-1/2 lg:w-1/3"}
            messageError={messageError}
            messageSuccess={messageSuccess}
            setMessageError={setMessageError}
            setMessageSuccess={setMessageSuccess}
          />
        </div>

        <form className="md:h-[450px]" onSubmit={handleSubmitFeedback}>
          <div className="flex flex-col gap-3 px-3 md:items-center">
            <ContainerInput>
              <Label
                htmlFor="name"
                value="Nama "
                className="mb-2 block text-base md:text-xl"
              />
              <TextInput
                placeholder="Nama Anda"
                autoFocus
                id="name"
                name="name"
                type="text"
                sizing="md"
                required
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                value={name}
              />
            </ContainerInput>
            <ContainerInput>
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
                sizing="md"
                required
                disabled={isLoading}
                value={email}
              />
            </ContainerInput>
            <ContainerInput>
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
                sizing="md"
                required
                rows={4}
                className="scrollbar"
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                value={message}
              />
            </ContainerInput>

            <ContainerInput>
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
          </div>
        </form>
      </div>
    </>
  );
}

import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
