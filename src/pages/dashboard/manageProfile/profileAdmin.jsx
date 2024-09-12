import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { updateProfile } from "../../../services/profile.service";
import { toTop } from "../../../utils/toTop";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";

export const ProfileAdmin = () => {
  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [fullname, setFullname] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const dataProfile = useSelector((state) => state.auth.userData);
  console.log({ dataProfile });

  const handleEnableEdit = (e) => {
    e.preventDefault();
    setFormEdit(!formEdit);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (
      fullname.trim() === "" ||
      nik.trim() === "" ||
      email.trim() === "" ||
      phone_number.trim() === ""
    ) {
      setMessageError("Isi semua kolom");
      toTop();
    }
    try {
      setLoading(true);
      const res = await updateProfile();
      console.log(res);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    setFullname(
      dataProfile?.info?.users?.fullname || dataProfile?.data?.users?.fullname,
    );
    setUsername(dataProfile?.info?.username || dataProfile?.data?.username);
    setNik(dataProfile?.info?.users?.nik || dataProfile?.data?.users?.nik);
    setEmail(
      dataProfile?.info?.users?.email || dataProfile?.data?.users?.email,
    );
    setPhone_number(
      dataProfile?.info?.users?.phone_number ||
        dataProfile?.data?.users?.phone_number,
    );
    setRole(dataProfile?.info?.role || dataProfile?.data?.role);
  }, [dataProfile]);

  console.log({ dataProfile });
  console.log({ fullname });
  console.log({ nik });
  console.log({ email });
  console.log({ phone_number });
  console.log({ username });

  return (
    <>
      <hr />
      <TitleSection className="my-5 flex px-3 underline">
        <FaUser /> Profil
      </TitleSection>
      <hr />

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

      <form className="flex flex-wrap" onSubmit={handleEditProfile}>
        <CountenerInput>
          <Label
            htmlFor="fullname"
            value="Nama Lengkap"
            className="mb-2 block text-base"
          />

          <TextInput
            autoFocus
            disabled={!formEdit}
            id="fullname"
            name="fullname"
            type="text"
            sizing="md"
            value={fullname ?? "loading..."}
            onChange={(e) => setFullname(e.target.value)}
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
            disabled
            type="text"
            sizing="md"
            value={username ?? "loading..."}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="nik" value="NIK" className="mb-2 block text-base" />

          <TextInput
            id="nik"
            disabled={!formEdit}
            name="nik"
            type="text"
            sizing="md"
            onChange={(e) => setNik(e.target.value)}
            value={nik ?? "loading..."}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="email"
            value="Email"
            className="mb-2 block text-base"
          />

          <TextInput
            id="email"
            disabled={!formEdit}
            type="email"
            name="email"
            sizing="md"
            value={email ?? "loading..."}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="phone_number"
            value="No Hp"
            className="mb-2 block text-base"
          />

          <TextInput
            id="phone_number"
            name="phone_number"
            disabled={!formEdit}
            type="number"
            sizing="md"
            value={phone_number ?? "loading..."}
            onChange={(e) => setPhone_number(e.target.value)}
          />
        </CountenerInput>

        <CountenerInput>
          <Label htmlFor="role" value="Role" className="mb-2 block text-base" />

          <TextInput
            id="role"
            disabled
            type="text"
            sizing="md"
            value={role ?? "loading..."}
          />
        </CountenerInput>

        {formEdit && (
          <>
            <ButtonFunc className="m-3 bg-primary text-white">
              Simpan
            </ButtonFunc>

            <ButtonFunc
              className="m-3 bg-primary text-white"
              onClick={() => setFormEdit(false)}
              type="button"
            >
              Batal
            </ButtonFunc>
          </>
        )}
      </form>

      {!formEdit && (
        <ButtonFunc
          className="m-3 bg-tan text-black"
          onClick={() => setFormEdit(true)}
          type="button"
        >
          Edit
        </ButtonFunc>
      )}

      {/* <form className="flex flex-wrap" onSubmit={handleEditProfile}>
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
      </form> */}
    </>
  );
};
