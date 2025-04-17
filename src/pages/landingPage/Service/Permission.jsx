import {
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { toView } from "../../../utils/toView";

export const PermissionPage = () => {
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const [errIdentity, setErrIdentity] = useState("");
  const [errLetter, setErrLetter] = useState("");
  const [errProposal, setErrProposal] = useState("");

  const [use, setUse] = useState("");

  const [formInput, setformInput] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    using: "",
    detail: "",
    location: "",
    date: "",
    participan: "",
    information: "",
    identity: null,
    letter: null,
    proposal: null,
  });

  const handleChangeFile = (e) => {
    const { name, files } = e.target;
    let file = files[0];
    if (name === "identity" && files.length > 0) {
      if (file.size > 500 * 1024) {
        setErrIdentity("Ukuran gambar melebihi 500 KB!");
        return;
      } else {
        setErrIdentity("");
      }
    }
    if (name === "letter" && files.length > 0) {
      if (file.size > 800 * 1024) {
        setErrLetter("Ukuran file melebihi 800 KB!");
        return;
      } else {
        setErrLetter("");
      }
    }
    if (name === "proposal" && files.length > 0) {
      if (file.size > 1024 * 3 * 1024) {
        setErrProposal("Ukuran file melebihi 3 MB!");
        return;
      } else {
        setErrProposal("");
      }
    }

    setformInput((prevformInput) => ({
      ...prevformInput,
      [name]: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevformInput) => ({
      ...prevformInput,
      [name]: value,
    }));

    if (name === "using") {
      setUse(value);
      if (value !== use) {
        setformInput((prevformInput) => ({
          ...prevformInput,
          detail: "",
        }));
      }
    }
  };

  const validateformInput = () => {
    // Validasi untuk kolom teks
    if (formInput.name.trim() === "") {
      setMessageError("Kolom Nama Lengkap tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.phone.trim() === "") {
      setMessageError("Kolom No WA/Telepon tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.email.trim() === "") {
      setMessageError("Kolom Email tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.category.trim() === "") {
      setMessageError("Kolom Kategori Pemohon tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.using.trim() === "") {
      setMessageError("Kolom Jenis Pemanfaatan tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.detail.trim() === "") {
      setMessageError("Kolom Detail Pemanfaatan tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.location.trim() === "") {
      setMessageError("Kolom Lokasi Kegiatan tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.date.trim() === "") {
      setMessageError("Kolom Tanggal Kegiatan tidak boleh kosong!");
      toView("top");
      return false;
    } else if (formInput.participan === 0) {
      setMessageError("Kolom Jumlah Peserta tidak boleh kosong!");
      toView("top");
      return false;
    } else if (!formInput.identity) {
      setMessageError("Kolom Tanda Pengenal tidak boleh kosong!");
      toView("top");
      return false;
    } else if (!formInput.letter) {
      setMessageError("Kolom Surat Permohonan tidak boleh kosong!");
      toView("top");
      return false;
    }

    // Validasi ukuran file
    if (formInput.identity && formInput.identity.size > 512000) {
      setMessageError("Maksimal ukuran Tanda Pengenal 500 KB!");
      toView("top");
      return false;
    }

    if (formInput.letter && formInput.letter.size > 819200) {
      setMessageError("Maksimal ukuran Surat Permohonan 800 KB!");
      toView("top");
      return false;
    }

    if (formInput.proposal && formInput.proposal.size > 3145728) {
      setMessageError("Maksimal ukuran Proposal 3 MB!");
      toView("top");
      return false;
    }

    return true; // Semua validasi berhasil
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateformInput()) return;

    const formData = new FormData();

    for (let key in formInput) {
      formData.append(key, formInput[key]);
    }

    console.log({ formData });
    alert("terkirim");

    setformInput({
      name: "",
      phone: "",
      email: "",
      category: "",
      using: "",
      detail: "",
      location: "",
      date: "",
      participan: "",
      information: "",
      identity: null,
      letter: null,
      proposal: null,
    });
  };

  // console.log("using = " + formInput.using);
  // console.log("detail = " + formInput.detail);

  return (
    <>
      <div className="min-h-screen py-28">
        {/* background */}
        <div className="absolute inset-0 -z-10 bg-[url('/images/bg2.svg')] bg-cover bg-no-repeat blur-md" />
        <div className={`flex w-full items-center gap-5 px-5 md:px-10 md:pb-5`}>
          <span className={`h-px flex-1 bg-primary`}></span>
          <TitleSection>Permohonan Izin Pemanfaatan Cagar Budaya</TitleSection>
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

        <div>
          <p className="px-10 text-justify text-lg">
            Prosedur Permohonan Informasi :{" "}
            <a href="#" className="italic underline">
              cek disini
            </a>
          </p>
        </div>

        <form
          className="flex flex-wrap gap-y-3 px-7 pt-10"
          onSubmit={handleSubmit}
        >
          {/* name */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="name"
              value="Nama Lengkap"
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
              onChange={handleChange}
              value={formInput.name}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* phone */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="phone"
              value="No WA/Telepon"
              className="mb-2 block text-base md:text-xl"
            />
            <TextInput
              className=""
              placeholder="08xx-xxxx-xxxx"
              autoFocus
              id="phone"
              name="phone"
              type="number"
              inputMode="numeric"
              maxLength={12}
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.phone}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* email */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="email"
              value="Email"
              className="mb-2 block text-base md:text-xl"
            />
            <TextInput
              className=""
              placeholder="email@gmail.com"
              autoFocus
              id="email"
              name="email"
              type="email"
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.email}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* category */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="category"
              value="Kategori Pemohon"
              className="mb-2 block text-base md:text-xl"
            />
            <Select
              id="category"
              name="category"
              sizing="text-xl"
              required
              value={formInput.category}
              onChange={handleChange}
            >
              <option value={""} className="bg-light">
                --Kategori--
              </option>
              <option value={"individual"}>Perseorangan</option>
              <option value={"institute"}>Lembaga</option>
            </Select>
          </ContainerInput>

          {/* using */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="using"
              value="Jenis Pemanfaatan"
              className="mb-2 block text-base md:text-xl"
            />
            <Select
              id="using"
              name="using"
              sizing="text-xl"
              required
              value={formInput.using}
              onChange={handleChange}
            >
              <option value={""} className="bg-light">
                --Jenis Pemanfaatan--
              </option>
              <option value={"visit"}>Kunjungan</option>
              <option value={"study"}>Penelitian</option>
              <option value={"take-picture"}>Pengambilan foto & video</option>
              <option value={"use-cb"}>Pemakaian ruang cagar budaya</option>
              <option value={"loan-bmn"}>Peminjaman BMN</option>
              <option value={"other"}>Lainnya</option>
            </Select>
          </ContainerInput>

          {/* detail */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="detail"
              value="Detail Pemanfaatan"
              className="mb-2 block text-base md:text-xl"
            />
            {formInput.using === "other" || formInput.using === "use-cb" ? (
              <TextInput
                placeholder="Detail Pemanfaatan"
                autoFocus
                id="detail"
                name="detail"
                type="text"
                sizing="text-xl"
                required
                onChange={handleChange}
                value={formInput.detail}
                // disabled={isLoading}
              />
            ) : (
              <Select
                id="detail"
                name="detail"
                sizing="text-xl"
                value={formInput.detail}
                onChange={handleChange}
              >
                <option value={""} className="bg-light">
                  --Detail Pemanfaatan--
                </option>
                <DetailUse detail={formInput.using} />
              </Select>
            )}
          </ContainerInput>

          {/* location */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="location"
              value="Lokasi Kegiatan"
              className="mb-2 block text-base md:text-xl"
            />
            <TextInput
              className=""
              placeholder="Lembah Napu"
              autoFocus
              id="location"
              name="location"
              type="text"
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.location}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* date */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="date"
              value="Tanggal Kegiatan"
              className="mb-2 block text-base md:text-xl"
            />
            <TextInput
              className=""
              placeholder="Lembah Napu"
              autoFocus
              id="date"
              name="date"
              type="date"
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.date}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* participan */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="participan"
              value="Jumlah Peserta"
              className="mb-2 block text-base md:text-xl"
            />
            <TextInput
              className=""
              placeholder="10"
              autoFocus
              id="participan"
              name="participan"
              type="number"
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.participan}

              // disabled={isLoading}
            />
          </ContainerInput>

          {/* information */}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="information"
              value="Informasi Tambahan"
              className="mb-2 block text-base md:text-xl"
            />
            <Textarea
              rows={4}
              className="scrollbar text-md"
              placeholder="opsional"
              autoFocus
              id="information"
              name="information"
              type="number"
              sizing="text-xl"
              required
              onChange={handleChange}
              value={formInput.information}
              // disabled={isLoading}
            />
          </ContainerInput>

          {/* file tanda identitas*/}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="indentity"
              value="Tanda Pengenal (KTP/SIM/Kartu Pelajar/KTM/Passport)"
              className="mb-2 block text-base md:text-xl"
            />
            <FileInput
              id="indentity"
              name="identity"
              onChange={handleChangeFile}
              accept="image/*"
              // ref={imageInput}
              // disabled={isLoading}
            />
            <span
              className={`text-sm italic ${errIdentity ? "font-semibold text-red-500" : ""}`}
            >
              {errIdentity
                ? errIdentity
                : " Ukuran gambar maksimal 500 KB dan harus .jpg .jpeg .png"}
            </span>
          </ContainerInput>

          {/* file surat permohonan*/}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="letter"
              value="Surat Permohonan"
              className="mb-2 block text-base md:text-xl"
            />
            <FileInput
              id="letter"
              name="letter"
              accept="application/pdf"
              onChange={handleChangeFile}
              // ref={pdfInput}
              // disabled={isLoading}
            />
            <span
              className={`text-sm italic ${errLetter ? "font-semibold text-red-500" : ""}`}
            >
              {errLetter
                ? errLetter
                : " Ukuran gambar maksimal 800 KB dan harus .pdf"}
            </span>
          </ContainerInput>

          {/* file proposal*/}
          <ContainerInput className={"w-full"}>
            <Label
              htmlFor="proposal"
              value="Proposal (opsional)"
              className="mb-2 block text-base md:text-xl"
            />
            <FileInput
              id="proposal"
              name="proposal"
              accept="application/pdf"
              onChange={handleChangeFile}
              // ref={pdfInput}
              // disabled={isLoading}
            />
            <span
              className={`text-sm italic ${errProposal ? "font-semibold text-red-500" : ""}`}
            >
              {errProposal
                ? errProposal
                : " Ukuran gambar maksimal 3 MB dan harus .pdf"}
            </span>
          </ContainerInput>
        </form>

        {/* submit */}
        <ContainerInput
          className={"mx-auto w-full px-9 pt-5 md:w-3/4 lg:w-1/4"}
        >
          <ButtonFunc
            className="w-full bg-primary text-base text-white disabled:cursor-no-drop disabled:bg-tan"
            // disabled={!isChecked || isLoading}
            type="submit"
            onClick={handleSubmit}
          >
            Kirim
          </ButtonFunc>
        </ContainerInput>
      </div>
    </>
  );
};

const DetailUse = ({ detail }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (detail) {
      const optionsMap = {
        visit: [
          { value: "local", label: "Lokal" },
          { value: "foreign", label: "Asing" },
          { value: "student", label: "Peserta didik" },
        ],
        "take-picture": [
          { value: "education", label: "Edukasi" },
          { value: "promossion", label: "Promosi" },
          { value: "prewedding", label: "Prewedding" },
        ],
        study: [
          { value: "final-project", label: "Tugas Akhir" },
          { value: "skripsi", label: "Skripsi" },
          { value: "thesis", label: "Tesis" },
          { value: "dissertation", label: "Disertasi" },
          { value: "foreign-researcher", label: "Peneliti Asing" },
        ],
        "loan-bmn": [
          { value: "collection-cb", label: "Koleksi Cagar Budaya" },
          { value: "carpet", label: "Mobil Bioling" },
          { value: "diving-eqp", label: "Alat Selam" },
        ],
      };

      setOptions(optionsMap[detail] || []);
    } else {
      setOptions([]); // Reset options jika tidak ada detail
    }
  }, [detail]);

  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};
