import React, { useState, useEffect } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { TextInput, Label } from "flowbite-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getSulawesiBarat,
  getSulawesiTengah,
} from "../../../services/wilIndonesia.service";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";

export default function CreateLembah({ isOpenCreate }) {
  const [lembah, setLembah] = useState("");
  const [province, setProvince] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const resultValley = [];
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [failSubmit, setFailSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [massages, setMassages] = useState("");
  const handleSubmit = () => {
    if (
      lembah &&
      province &&
      regencies.length > 0 &&
      districts.length > 0 &&
      villages.length > 0
    ) {
      const resultLembah = {
        lembah,
        province,
        regency:
          regencies.find(
            (r) => r.name === document.getElementById("kabkota").value,
          )?.name || "",
        district:
          districts.find(
            (d) => d.name === document.getElementById("kecamatan").value,
          )?.name || "",
        village:
          villages.find(
            (v) => v.name === document.getElementById("kelurahan").value,
          )?.name || "",
      };

      setTimeout(() => {
        setIsDisabled(true);
        setLembah("");
        setProvince("");
        setRegencies([]);
        setDistricts([]);
        setVillages([]);
        resultValley.push(resultLembah);
        setSuccessSubmit(true);
        setIsDisabled(false);
      }, 3000);
    } else {
      setFailSubmit(true);
      setMassages("Semua kolom harus diisi");
    }
  };

  useEffect(() => {
    if (province) {
      const fetchRegencies = async () => {
        const dataProvince =
          province === "Sulawesi Tengah"
            ? await getSulawesiTengah()
            : await getSulawesiBarat();
        setRegencies(dataProvince);
        setDistricts([]);
        setVillages([]);
      };
      fetchRegencies();
    }
  }, [province]);

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleRegencySelect = async (e) => {
    const selectedRegency = e.target.value;
    const regency = regencies.find((r) => r.name === selectedRegency);
    if (regency) {
      const dataRegencies = await getKecamatan(regency.id);
      setDistricts(dataRegencies);
      setVillages([]);
    }
  };

  const handleDistrictSelect = async (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find((d) => d.name === selectedDistrict);
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
    setVillages([]);
  };

  return (
    <>
      <div className={isOpenCreate ? "block" : "hidden"}>
        <TitleSection className="underline">Tambah Objek Megalit</TitleSection>
        <hr className="my-5" />

        {(successSubmit && (
          <SuccessAlert setSuccessSubmit={setSuccessSubmit} />
        )) ||
          (failSubmit && (
            <FailAllert setFailSubmit={setFailSubmit}>{massages}</FailAllert>
          )) ||
          null}

        <div className="flex flex-wrap">
          <CountenerInput>
            <Label
              htmlFor="lembah"
              value="Nama Lembah"
              className="mb-2 block text-base"
            />
            <TextInput
              autoFocus
              id="lembah"
              type="text"
              value={lembah}
              onChange={(e) => setLembah(e.target.value)}
              sizing="md"
            />
          </CountenerInput>

          <CountenerInput>
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
            >
              <option>Pilih Provinsi</option>
              <option value="Sulawesi Tengah">Sulawesi Tengah</option>
              <option value="Sulawesi Barat">Sulawesi Barat</option>
            </select>
          </CountenerInput>

          <CountenerInput>
            <Label
              htmlFor="kabupaten/kota"
              value="Nama Kabupaten/Kota"
              className="mb-2 block text-base"
            />
            <select
              id="kabkota"
              placeholder="Pilih Kabupaten/Kota"
              onChange={handleRegencySelect}
              className="w-full rounded-md"
              value={regencies?.length > 0 ? regencies.name : ""}
            >
              <option>Pilih Kabupaten/Kota</option>
              {regencies?.map((regency) => (
                <option key={regency.id} value={regency.name}>
                  {regency.name}
                </option>
              ))}
            </select>
          </CountenerInput>

          <CountenerInput>
            <Label
              htmlFor="kecamatan"
              value="Nama Kecamatan"
              className="mb-2 block text-base"
            />
            <select
              id="kecamatan"
              placeholder="Pilih Kecamatan"
              onChange={handleDistrictSelect}
              className="w-full rounded-md"
              value={districts?.length > 0 ? districts.name : ""}
            >
              <option>Pilih Kecamatan</option>
              {districts?.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </CountenerInput>
        </div>

        <ButtonFunc
          className={`m-3 bg-primary text-white`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Simpan
        </ButtonFunc>
        <ButtonFunc className={`bg-tan`} onClick={handleReset}>
          Reset
        </ButtonFunc>
      </div>
    </>
  );
}
