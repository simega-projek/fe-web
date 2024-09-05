import React, { useState } from "react";

import TitleSection from "../../../components/Elements/TitleSection";
import { FaHome, FaUser, FaBookmark } from "react-icons/fa";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import {
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";

export const ProfileAdmin = () => {
  const [formEdit, setFormEdit] = useState(false);

  const handleEnableEdit = () => {
    setFormEdit(!formEdit);
  };

  const handleSubmitForm = () => {
    setFormEdit(!formEdit);
  };

  return (
    <>
      <hr />
      <TitleSection className="my-5 flex px-3 underline">
        <FaUser /> Profil
      </TitleSection>
      <hr />

      <div className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="namaLengkap"
            value="Nama Lengkap"
            className="mb-2 block text-base"
          />

          <TextInput
            autoFocus
            disabled={!formEdit}
            id="namaLengkap"
            type="text"
            sizing="md"
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="username"
            value="Username"
            className="mb-2 block text-base"
          />

          <TextInput
            id="username"
            disabled={!formEdit}
            type="text"
            sizing="md"
          />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="nik" value="NIK" className="mb-2 block text-base" />

          <TextInput id="nik" disabled={!formEdit} type="text" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="email"
            value="Email"
            className="mb-2 block text-base"
          />

          <TextInput id="email" disabled={!formEdit} type="email" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="noHp"
            value="No Hp"
            className="mb-2 block text-base"
          />

          <TextInput id="noHp" disabled={!formEdit} type="email" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="role" value="Role" className="mb-2 block text-base" />

          <TextInput id="role" disabled type="email" sizing="md" />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="password"
            value="Password"
            className="mb-2 block text-base"
          />

          <TextInput
            id="password"
            disabled={!formEdit}
            type={`${formEdit ? "text" : "password"}`}
            sizing="md"
            value={`sadasdjh`}
          />
        </CountenerInput>

        {formEdit ? (
          <CountenerInput>
            <Label
              htmlFor="confirmPassword"
              value="Confirm Password"
              className="mb-2 block text-base"
            />

            <TextInput
              id="confirmPassword"
              disabled={!formEdit}
              type="text"
              sizing="md"
            />
          </CountenerInput>
        ) : (
          ""
        )}
      </div>

      {formEdit ? (
        <>
          <ButtonFunc
            className="m-3 bg-primary text-white"
            onClick={handleSubmitForm}
          >
            Simpan
          </ButtonFunc>

          <ButtonFunc
            className="m-3 bg-primary text-white"
            onClick={handleEnableEdit}
          >
            Batal
          </ButtonFunc>
        </>
      ) : (
        <>
          <ButtonFunc
            className="m-3 bg-tan text-black"
            onClick={handleEnableEdit}
          >
            Edit
          </ButtonFunc>
        </>
      )}
    </>
  );
};
