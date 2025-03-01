import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { getOneValley, updateValley } from "../../../services/valley.service";
import {
  getKecamatan,
  getKelurahan,
  getSulawesiBarat,
  getSulawesiTengah,
} from "../../../services/wilIndonesia.service";
import { toView } from "../../../utils/toView";

export default function UpdateLembah({ id, isOpenUpdate, onSuccess, onClose }) {
  const regencyRef = useRef(null);

  const [dataUpdate, setDataUpdate] = useState({});

  const [lembah, setLembah] = useState("");
  const [province, setProvince] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  const handleUpdateValley = async (e) => {
    e.preventDefault();

    // Cek apakah semua field sudah diisi
    if (!lembah || !province || !selectedRegency || !selectedDistrict) {
      setMessageError("Semua kolom harus diisi");
      setMessageSuccess(null);
      toView("top");
      return;
    }

    const dataRegency = `${selectedRegency.name},${selectedRegency.id},${selectedRegency.province_id}`;
    const dataDistricts = `${selectedDistrict.name},${selectedDistrict.id},${selectedDistrict.regency_id}`;

    const formData = new FormData();
    formData.append("lembah", lembah);
    formData.append("provinsi", province);
    formData.append("kabupaten_kota", dataRegency);
    formData.append("kecamatan", dataDistricts);

    try {
      setIsLoading(true);
      const res = await updateValley(id, formData);

      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        toView("top");
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);

        if (onSuccess) {
          onSuccess();
          toView("top");
          setTimeout(() => {
            onClose();
            setMessageSuccess(null);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOneValley = async (id) => {
    setIsLoading(true);
    try {
      const res = await getOneValley(id);
      const data = res?.data;
      setDataUpdate(data);
      setLembah(data?.lembah);
      setProvince(data?.provinsi);

      // Split kabupaten_kota and kecamatan to extract name and id
      const kabupatenData = data?.kabupaten_kota.split(",");
      const kecamatanData = data?.kecamatan.split(",");

      if (data?.provinsi === "Sulawesi Tengah") {
        const dataRegencies = await getSulawesiTengah();
        const regency = dataRegencies.find((r) => r.id === kabupatenData[1]);
        setRegencies(dataRegencies);
        setSelectedRegency(regency); // Automatically select the regency
        const districts = await getKecamatan(regency.id);
        setDistricts(districts);
        const selectedDistrict = districts.find(
          (d) => d.id === kecamatanData[1],
        );
        setSelectedDistrict(selectedDistrict); // Automatically select the district
      } else if (data?.provinsi === "Sulawesi Barat") {
        const dataRegencies = await getSulawesiBarat();
        const regency = dataRegencies.find((r) => r.id === kabupatenData[1]);
        setRegencies(dataRegencies);
        setSelectedRegency(regency); // Automatically select the regency
        const districts = await getKecamatan(regency.id);
        setDistricts(districts);
        const selectedDistrict = districts.find(
          (d) => d.id === kecamatanData[1],
        );
        setSelectedDistrict(selectedDistrict); // Automatically select the district
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

  const handleDistrictSelect = async (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find((d) => d.name === selectedDistrict);

    setSelectedDistrict(district);
    if (district) {
      const dataDistricts = await getKelurahan(district.id);
      setVillages(dataDistricts);
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

  useEffect(() => {
    if (id) {
      fetchOneValley(id);
    }
  }, [id]);

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
      <div className={isOpenUpdate ? "block" : "hidden"}>
        <div className="mb-2 flex justify-between">
          <TitleSection className="underline">Ubah Data Lembah</TitleSection>
          <hr className="my-5" />
          <Button color="red" onClick={onClose}>
            X
          </Button>
        </div>

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

        <form onSubmit={handleUpdateValley} className="flex flex-wrap">
          <ContainerInput>
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
              id="kabkota"
              placeholder="Pilih Kabupaten/Kota"
              onChange={handleRegencySelect}
              className="w-full rounded-md"
              disabled={isLoading}
              value={selectedRegency?.name || ""}
            >
              <option>Pilih Kabupaten/Kota</option>
              {regencies?.map((regency) => (
                <option key={regency.id} value={regency.name}>
                  {regency.name}
                </option>
              ))}
            </select>
          </ContainerInput>

          <ContainerInput>
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
              disabled={isLoading}
              value={selectedDistrict?.name || ""}
            >
              <option>Pilih Kecamatan</option>
              {districts?.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </ContainerInput>

          <ButtonFunc
            className={`m-3 bg-primary text-white disabled:cursor-no-drop`}
            onClick={handleUpdateValley}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </ButtonFunc>
          <ButtonFunc
            className={`m-3 bg-tan`}
            onClick={handleBtnCancel}
            type="button"
          >
            Batal
          </ButtonFunc>
        </form>
      </div>
    </>
  );
}
