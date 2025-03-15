import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { createValley } from "../../../services/valley.service";
import {
  getKecamatan,
  getKelurahan,
  getSulawesiBarat,
  getSulawesiTengah,
} from "../../../services/wilIndonesia.service";
import { toView } from "../../../utils/toView";

export default function CreateLembah({ isOpenCreate, onSuccess, onClose }) {
  const regencyRef = useRef(null);

  const [lembah, setLembah] = useState("");
  const [province, setProvince] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]); // Kecamatan
  const [villages, setVillages] = useState([]);

  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(""); //kecamatan

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateValley = async (e) => {
    e.preventDefault();

    if (
      !lembah ||
      !province ||
      !regencies?.length > 0 ||
      !districts?.length > 0
      // ||!villages?.length > 0
    ) {
      setMessageError("Semua kolom harus diisi");
      setMessageSuccess(null);
      toView("top");
      return;
    }
    const dataRegency =
      selectedRegency["name"] +
      "," +
      selectedRegency["id"] +
      "," +
      selectedRegency["province_id"];

    const dataDistricts =
      selectedDistrict["name"] +
      "," +
      selectedDistrict["id"] +
      "," +
      selectedDistrict["regency_id"];
    // console.log({ dataRegency });
    // console.log({ dataDistricts });
    // return;

    const formData = new FormData();
    formData.append("lembah", lembah);
    formData.append("provinsi", province);
    formData.append("kabupaten_kota", dataRegency);
    // formData.append("kecamatan", dataDistricts); //kecmatan

    try {
      setIsLoading(true);
      const res = await createValley(formData);
      // console.log(res);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        onSuccess();
        handleReset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    // console.log({ selectedDistrict, selectedRegency });
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleRegencySelect = async (e) => {
    const selectRegency = e.target.value;
    // console.log(selectRegency);
    const regency = regencies.find((r) => r.name === selectRegency);

    setSelectedRegency(regency);
    if (regency) {
      const dataRegencies = await getKecamatan(regency.id);
      // console.log({ dataRegencies });

      setDistricts(dataRegencies);
      setVillages([]);
    }
  };

  // pilih kecamatan
  const handleDistrictSelect = async (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find((d) => d.name === selectedDistrict);

    setSelectedDistrict(district);
    if (district) {
      const dataDistricts = await getKelurahan(district.id);
      setVillages(dataDistricts);
    }
  };

  const handleReset = () => {
    setLembah("");
    setProvince("");
    setRegencies([]);
    setDistricts([]);
  };

  useEffect(() => {
    if (province) {
      const fetchRegencies = async () => {
        const dataProvince =
          province === "Sulawesi Tengah"
            ? await getSulawesiTengah()
            : await getSulawesiBarat();
        // console.log({ dataProvince });
        setRegencies(dataProvince);
        setDistricts([]);
        setVillages([]);
      };
      fetchRegencies();
    }
  }, [province]);

  useEffect(() => {
    if (isOpenCreate === false) {
      handleReset();
    }
  }, []);

  // console.log({ province });
  // console.log({ regencies });
  // console.log({ districts });
  // console.log({ villages });

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  return (
    <>
      <div className={isOpenCreate ? "block" : "hidden"}>
        <div className="mb-2 flex justify-between">
          <TitleSection className="underline">
            Tambah Lembah / Wilayah
          </TitleSection>
          <hr className="my-5" />
          <Button color="red" onClick={onClose}>
            X
          </Button>
        </div>

        {/* alert */}
        <AlertMessage
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />

        <form onSubmit={handleCreateValley} className="flex flex-wrap">
          <ContainerInput>
            <Label
              htmlFor="lembah"
              value="Nama Lembah / Wilayah"
              className="mb-2 block text-base"
            />
            <TextInput
              placeholder="Behoa"
              autoFocus
              id="lembah"
              type="text"
              value={lembah}
              onChange={(e) => setLembah(e.target.value)}
              sizing="md"
              disabled={isLoading}
              ref={activeRef}
            />
          </ContainerInput>

          <ContainerInput>
            <Label
              htmlFor="provinsi"
              value="Nama Provinsi"
              className="mb-2 block text-base"
            />
            <select
              id="province-list"
              placeholder="Pilih Provinsi"
              value={province}
              onChange={handleProvinceChange}
              className="w-full rounded-md"
              disabled={isLoading}
            >
              <option>Pilih Provinsi</option>
              <option value="Sulawesi Tengah">Sulawesi Tengah</option>
              <option value="Sulawesi Barat">Sulawesi Barat</option>
            </select>
          </ContainerInput>

          <ContainerInput>
            <Label
              htmlFor="kabupaten/kota"
              value="Nama Kabupaten/Kota"
              className="mb-2 block text-base"
            />
            <select
              // ref={regencyRef}
              id="kabkota"
              placeholder="Pilih Kabupaten/Kota"
              onChange={handleRegencySelect}
              className="w-full rounded-md"
              disabled={isLoading}
              value={regencies?.length > 0 ? regencies?.name : ""}
            >
              <option>Pilih Kabupaten/Kota</option>
              {regencies?.map((regency) => (
                <option key={regency?.id} value={regency?.name}>
                  {regency?.name}
                </option>
              ))}
            </select>
          </ContainerInput>
        </form>

        <ButtonFunc
          className={`m-3 bg-primary text-white disabled:cursor-no-drop`}
          disabled={isLoading}
          onClick={handleCreateValley}
        >
          Simpan
        </ButtonFunc>
        <ButtonFunc
          className={`bg-tan disabled:cursor-no-drop`}
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </ButtonFunc>
      </div>
    </>
  );
}
