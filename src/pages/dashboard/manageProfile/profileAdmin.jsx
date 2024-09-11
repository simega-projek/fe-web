import { Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import TitleSection from "../../../components/Elements/TitleSection";

export const ProfileAdmin = () => {
  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const dataProfile = useSelector((state) => state.auth.userData);
  console.log(dataProfile);

  const handleEnableEdit = () => {
    setFormEdit(!formEdit);
  };

  const handleSubmitForm = () => {
    setFormEdit(!formEdit);
  };

  // const fetchProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const profile = await getProfile();
  //     setFullname(profile?.data?.users?.fullname);
  //     setNik(profile?.data?.users?.nik);
  //     setEmail(profile?.data?.users?.email);
  //     setPhone_number(profile?.data?.users?.phone_number);
  //     setRole(profile?.data?.role);
  //     setUsername(profile?.data?.username);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

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

  console.log(dataProfile);

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
            value={fullname ?? ""}
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
            value={username ?? ""}
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
            value={nik ?? ""}
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
            value={email ?? ""}
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
            value={phone_number ?? ""}
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
            value={role ?? ""}
          />
        </CountenerInput>

        {/* <CountenerInput>
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
        )} */}
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
