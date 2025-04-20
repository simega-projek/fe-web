import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { createSite } from "../../../services/site.service";
import { getAllValley } from "../../../services/valley.service";
import {
  getKecamatan,
  getKelurahan,
} from "../../../services/wilIndonesia.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { toView } from "../../../utils/toView";
import { BtnCreateForm } from "../../../components/Elements/Buttons/BtnCreateForm";

export default function CreateSitus({ isOpenCreate, onSuccess, onClose }) {
  const [situsName, setSitusName] = useState("");
  const [valleyData, setValleyData] = useState([]);
  const [villageData, setVillageData] = useState([]);
  const [districts, setDistricts] = useState([]); // Kecamatan

  const [selectedValley, setSelectedValley] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null); //kecamatan

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setSitusName("");
    setSelectedValley(null);
    setSelectedVillage(null);
    setSelectedDistrict(null);
    setMessageError(null);
    setDistricts([]);
  };

  const handleCreateSite = async (e) => {
    e.preventDefault();

    if (
      situsName.trim() === "" ||
      selectedValley === null ||
      selectedVillage === null
    ) {
      setMessageError("Semua kolom harus diisi");
      setMessageSuccess(null);
      toView("top");
      return;
    }

    const dataVillage =
      selectedVillage["name"] +
      "," +
      selectedVillage["id"] +
      "," +
      selectedVillage["district_id"];
    // console.log("data masuk: " + dataVillage);

    const dataDistrict =
      selectedDistrict["name"] +
      "," +
      selectedDistrict["id"] +
      "," +
      selectedDistrict["regency_id"];

    const formData = new FormData();
    formData.append("nama_situs", situsName);
    formData.append("lembah_id", selectedValley["ID"]);
    formData.append("kecamatan", dataDistrict);
    formData.append("desa_kelurahan", dataVillage);

    try {
      setIsLoading(true);
      const res = await createSite(formData);
      // console.log("hasil create: " + res);
      if (res.error) {
        setMessageError(res.messageError);
        setMessageSuccess(null);
        toView("top");
        return;
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        toView("top");
        onSuccess();
        handleReset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log({ selectedValley });

  // Fetch semua data lembah
  const fetchValley = async () => {
    setIsLoading(true);
    try {
      const res = await getAllValley();
      // console.log(res);
      setValleyData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data desa berdasarkan kecamatan ID dari lembah terpilih
  const fetchVillages = async (valley) => {
    if (!valley) return;
    setIsLoading(true);
    try {
      let kecamatanId = getDataByIndex(valley?.kecamatan, 2); //
      // console.log("Kecamatan ID: ", Number(kecamatanId));

      const res = await getKelurahan(kecamatanId);
      setVillageData(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDistrict = async (valley) => {
    if (!valley) return;
    setIsLoading(true);
    try {
      let kecamatanId = getDataByIndex(valley?.kabupaten_kota, 1); //
      // console.log("Kecamatan ID: ", Number(kecamatanId));

      const res = await getKecamatan(kecamatanId);
      // console.log(res);

      setDistricts(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValleyChange = (e) => {
    const selectedValleyName = e.target.value;
    const valley = valleyData.find((v) => v.lembah === selectedValleyName);
    // console.log({ valley });
    setSelectedValley(valley);
    fetchDistrict(valley);
    setVillageData([]);
    // console.log({ valley });
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find((d) => d.name === selectedDistrict);

    // console.log({ district });
    setSelectedDistrict(district);
    if (district) {
      const dataDistricts = await getKelurahan(district?.id);
      // console.log({ dataDistricts });
      setVillageData(dataDistricts);
    }
  };

  const handleVillageChange = (e) => {
    const selectedVillageName = e.target.value;
    const village = villageData.find((v) => v.name === selectedVillageName);
    // console.log(village);
    setSelectedVillage(village);
  };

  // console.log({ selectedValley });
  // console.log({ villageData });
  // console.log({ selectedVillage });

  useEffect(() => {
    fetchValley();
  }, []);

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="mb-2 flex justify-between">
        <TitleSection className="underline">Tambah Situs</TitleSection>
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

      {/* form pembuatan situs */}
      <form onSubmit={handleCreateSite} className="flex flex-wrap">
        {/* nama situs */}
        <ContainerInput>
          <Label
            htmlFor="situs"
            value="Nama Situs"
            className="mb-2 block text-base"
          />
          <TextInput
            placeholder="Palindo"
            autoFocus
            id="situs"
            type="text"
            sizing="md"
            value={situsName}
            onChange={(e) => setSitusName(e.target.value)}
            disabled={isLoading}
            ref={activeRef}
          />
        </ContainerInput>

        {/* lembah */}
        <ContainerInput>
          <Label
            htmlFor="lembah"
            value="Lembah / Wilayah"
            className="mb-2 block text-base"
          />
          <select
            id="lembah"
            placeholder="Pilih Lembah / Wilayah"
            className="w-full rounded-md"
            onChange={handleValleyChange} //
            value={selectedValley?.lembah ?? ""}
            disabled={isLoading}
          >
            <option>Pilih Lembah / Wilayah</option>
            {valleyData?.map((valley) => (
              <option key={valley?.ID} value={valley?.lembah}>
                {valley?.lembah}
              </option>
            ))}
          </select>
        </ContainerInput>

        {/* kecamatan */}
        <ContainerInput>
          <Label
            htmlFor="kecamatan"
            value="Nama Kecamatan"
            className="mb-2 block text-base"
          />
          <select
            id="kecamatan"
            placeholder="Pilih Kecamatan"
            onChange={handleDistrictChange}
            className="w-full rounded-md"
            disabled={isLoading}
            value={districts?.length > 0 ? districts?.name : ""}
          >
            <option>Pilih Kecamatan</option>
            {districts?.map((district) => (
              <option key={district?.id} value={district?.name}>
                {district?.name}
              </option>
            ))}
          </select>
        </ContainerInput>

        {/* kelurahan */}
        <ContainerInput>
          <Label
            htmlFor="kelurahan"
            value="Nama Kelurahan"
            className="mb-2 block text-base"
          />
          <select
            id="kelurahan"
            placeholder="Pilih Kelurahan"
            className="w-full rounded-md"
            value={selectedVillage?.name ?? ""}
            onChange={handleVillageChange} //
            disabled={isLoading}
          >
            <option>Pilih Kelurahan</option>
            {villageData?.map((village) => (
              <option key={village?.id} value={village?.name}>
                {village?.name}
              </option>
            ))}
          </select>
        </ContainerInput>
      </form>

      <BtnCreateForm
        handleReset={handleReset}
        handleSubmit={handleCreateSite}
        isLoading={isLoading}
      />
    </div>
  );
}
