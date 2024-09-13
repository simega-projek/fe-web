import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  changePassword,
  updateProfile,
} from "../../../services/profile.service";
import { toView } from "../../../utils/toView";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";

export const ProfileAdmin = () => {
  const [formEdit, setFormEdit] = useState(false);
  const [formPassword, setFormPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [fullname, setFullname] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dataProfile = useSelector((state) => state.auth.userData);

  const closeFormEditProfile = () => {
    setFormEdit(false);
    // toView("top")
  };
  const openFormChangePassword = () => {
    setFormPassword(true);
    toView("bottom");
  };
  const closeFormChangePassword = () => {
    setFormPassword(false);
    toView("top");
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
      toView("top");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("nik", nik);
    formData.append("email", email);
    formData.append("phone_number", phone_number);

    try {
      setIsLoading(true);
      const res = await updateProfile(formData);

      console.log(res);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
        setIsLoading(false);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        closeFormEditProfile();
        toView("top");
        setIsLoading(false);
      }
    } catch (err) {
      console.log("error update profile: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();

    if (
      password.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setMessageError("Isi semua kolom");
      toView("top");
      return;
    } else if (newPassword !== confirmPassword) {
      setMessageError("Password baru tidak sama");
      toView("top");
      return;
    } else if (newPassword.length < 8) {
      setMessageError("Password harus lebih dari atau sama dengan 8 karakter");
      toView("top");
      return;
    }

    const formData = new FormData();
    formData.append("old_password", password);
    formData.append("new_password", newPassword);

    try {
      setIsLoading(true);
      const res = await changePassword(formData);
      console.log("change password res: ", res);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
        setIsLoading(false);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        closeFormChangePassword();
        toView("top");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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

  // console.log({ dataProfile });

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
            value={phone_number ?? +"loading..."}
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
            <ButtonFunc
              className="m-3 bg-primary text-white"
              disabled={isLoading}
            >
              {isLoading ? "loading..." : "Simpan"}
            </ButtonFunc>

            <ButtonFunc
              className="m-3 bg-primary text-white"
              onClick={closeFormEditProfile}
              type="button"
            >
              Batal
            </ButtonFunc>
          </>
        )}
      </form>

      {!formEdit && (
        <>
          <ButtonFunc
            className="m-3 bg-tan text-black"
            onClick={() => setFormEdit(true)}
          >
            Edit Profile
          </ButtonFunc>

          {/* change password */}
          {!formPassword && (
            <ButtonFunc
              className="m-3 bg-tan text-white"
              onClick={openFormChangePassword}
            >
              Ganti Password
            </ButtonFunc>
          )}
        </>
      )}

      {/* change password */}
      {formPassword && (
        <form className="flex flex-wrap" onSubmit={handleEditPassword}>
          <CountenerInput>
            <Label
              htmlFor="password"
              value="Password Lama"
              className="mb-2 block text-base"
            />

            <TextInput
              id="password"
              type="text"
              sizing="md"
              onChange={(e) => setPassword(e.target.value)}
              name="old_password"
              autoComplete="off"
            />
          </CountenerInput>

          <CountenerInput>
            <Label
              htmlFor="newPassword"
              value="Password Baru"
              className="mb-2 block text-base"
            />

            <TextInput
              id="newPassword"
              type="text"
              sizing="md"
              name="new_password"
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="off"
            />
          </CountenerInput>

          <CountenerInput>
            <Label
              htmlFor="newPasswordConfirm"
              value="Konfirmasi Password Baru"
              className="mb-2 block text-base"
            />

            <TextInput
              id="newPasswordConfirm"
              type="text"
              sizing="md"
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
          </CountenerInput>

          <ButtonFunc
            className="m-3 bg-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? "loading..." : "Simpan"}
          </ButtonFunc>

          <ButtonFunc
            className="m-3 bg-primary text-white"
            onClick={closeFormChangePassword}
            type="button"
          >
            Batal
          </ButtonFunc>
        </form>
      )}
    </>
  );
};
