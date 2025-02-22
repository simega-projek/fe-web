import React, { useEffect, useRef } from "react";
import TitleSection from "../../components/Elements/TitleSection";
import { ContainerInput } from "../../components/Elements/Inputs/ContainerInput";
import { Label, Textarea, TextInput } from "flowbite-react";
import { ButtonFunc } from "../../components/Elements/Buttons/ButtonFunc";

export default function FeedbackPage() {
  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];
  return (
    <div>
      <div className="bg-tan bg-[url('/images/bg1.svg')] py-20 pb-5 pt-20 text-2xl">
        <TitleSection className="px-5 py-5 text-center">
          Umpan Balik
        </TitleSection>
        <form className="">
          <div className="flex flex-col gap-3 px-3 lg:items-center">
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
                type="text"
                sizing="md"
                required
                ref={activeRef}
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
                autoFocus
                id="email"
                type="text"
                sizing="md"
                required
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
                autoFocus
                id="message"
                type="text"
                sizing="md"
                required
                rows={4}
                className="scrollbar"
              />
            </ContainerInput>

            <ContainerInput>
              <ButtonFunc className="w-full bg-primary text-base text-white">
                Kirim
              </ButtonFunc>
            </ContainerInput>
          </div>
        </form>
      </div>
    </div>
  );
}
