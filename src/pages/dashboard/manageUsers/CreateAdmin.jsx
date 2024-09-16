import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { createAdmin } from "../../../services/superAdmin.service";
import { toView } from "../../../utils/toView";

export default function CreateAdmin({ isOpenCreate, onSuccess, onClose }) {
  const [fullname, setFullname] = useState("");
  const [nik, setNik] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleRegistration = async (e) => {
    e.preventDefault();

    const trimmedFullname = fullname.trim();
    const trimmedNik = nik.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    // Check for empty fields after trimming
    if (
      trimmedFullname === "" ||
      trimmedNik === "" ||
      trimmedUsername === "" ||
      trimmedEmail === ""
    ) {
      setMessageError("Isi semua kolom");
      toView("top");
      return;
    }

    if (password !== confirmPassword) {
      setMessageError(null);
      setMessageError("Password tidak sama");
      toView("top");
      return;
    } else if (password.length < 8) {
      setMessageError(null);
      setMessageError("Password harus lebih dari atau sama dengan 8 karakter");
      toView("top");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("nik", nik);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    try {
      setIsLoading(true);
      const res = await createAdmin(formData);
      if (res.error) {
        console.log("error", res);
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        console.log("success", res);

        setMessageSuccess(res.message);
        setMessageError(null);
        handleReset();
        toView("top");

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFullname("");
    setNik("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // console.log({ messageError });
  // console.log(messageSuccess);

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Tambah Akun Admin</TitleSection>
        <hr className="my-5" />
        <Button color="red" onClick={onClose}>
          X
        </Button>
      </div>

      {/* alert */}
      {messageError && (
        <FailAllert setMessageError={setMessageError}>
          {messageError}
        </FailAllert>
      )}

      {messageSuccess && (
        <SuccessAlert setMessageSuccess={setMessageSuccess}>
          {messageSuccess}
        </SuccessAlert>
      )}

      <form onSubmit={handleRegistration}>
        {/* create form */}
        <div className="flex flex-wrap">
          {/* fullname */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nama" className="text-base" />
            </div>
            <TextInput
              autoFocus
              id="name"
              required
              type="text"
              sizing="md"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
            />
          </CountenerInput>

          {/* nik */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label htmlFor="nip" value="NIK/NIP" className="text-base" />
            </div>
            <TextInput
              autoFocus
              id="nip"
              required
              type="text"
              name="nik"
              sizing="md"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </CountenerInput>

          {/* username */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label
                htmlFor="username"
                value="Username"
                className="text-base"
              />
            </div>
            <TextInput
              autoFocus
              id="username"
              required
              type="text"
              sizing="md"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </CountenerInput>

          {/* email */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" className="text-base" />
            </div>
            <TextInput
              autoFocus
              id="email"
              required
              type="email"
              sizing="md"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CountenerInput>

          {/* password */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Password"
                className="text-base"
              />
            </div>
            <TextInput
              autoFocus
              id="password"
              required
              type="text"
              sizing="md"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CountenerInput>

          {/* confirm password */}
          <CountenerInput>
            <div className="mb-2 block">
              <Label
                htmlFor="confirmPassword"
                value="ConfirmPassword"
                className="text-base"
              />
            </div>
            <TextInput
              autoFocus
              id="confirmPassword"
              required
              type="text"
              sizing="md"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CountenerInput>
        </div>

        <ButtonFunc className="m-3 bg-primary text-white" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </ButtonFunc>
        <ButtonFunc className="bg-tan" onClick={handleReset}>
          Reset
        </ButtonFunc>
      </form>
    </div>
  );
}
