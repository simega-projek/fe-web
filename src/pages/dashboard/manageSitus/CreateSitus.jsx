import React, { useEffect, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { Button, Label, TextInput } from "flowbite-react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { CountenerInput } from "../../../components/Elements/Inputs/CountenerInput";
import { getAllValley } from "../../../services/valley.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { getKelurahan } from "../../../services/wilIndonesia.service";
import { toView } from "../../../utils/toView";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { createSite } from "../../../services/site.service";

export default function CreateSitus({ isOpenCreate, onSuccess, onClose }) {
  const [situsName, setSitusName] = useState("");
  const [villageData, setVillageData] = useState([]);
  const [valleyData, setValleyData] = useState([]);

  const [selectedValley, setSelectedValley] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setSitusName("");
    setSelectedValley(null);
    setSelectedVillage(null);
    setMessageError(null);
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

    const formData = new FormData();
    formData.append("nama_situs", situsName);
    formData.append("desa_kelurahan", dataVillage);
    formData.append("lembah_id", selectedValley["ID"]);

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
      let kecamatanId = getDataByIndex(valley.kecamatan, 1); //
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

  useEffect(() => {
    fetchValley();
  }, []);

  const handleValleyChange = (e) => {
    const selectedValleyName = e.target.value;
    const valley = valleyData.find((v) => v.lembah === selectedValleyName);
    setSelectedValley(valley);
    fetchVillages(valley);
  };

  const handleVillageChange = (e) => {
    const selectedVillageName = e.target.value;
    const village = villageData.find((v) => v.name === selectedVillageName);
    // console.log(village);
    setSelectedVillage(village);
  };

  // console.log({ villageData });
  // console.log({ selectedValley });
  // console.log({ selectedVillage });

  return (
    <div className={isOpenCreate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Tambah Situs</TitleSection>
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

      {/* form pembuatan situs */}
      <form onSubmit={handleCreateSite} className="flex flex-wrap">
        <CountenerInput>
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
          />
        </CountenerInput>

        <CountenerInput>
          <Label
            htmlFor="lembah"
            value="Nama Lembah"
            className="mb-2 block text-base"
          />
          <select
            id="lembah"
            placeholder="Pilih Lembah"
            className="w-full rounded-md"
            onChange={handleValleyChange} //
            value={selectedValley?.lembah ?? ""}
            disabled={isLoading}
          >
            <option>Pilih Lembah</option>
            {valleyData?.map((valley) => (
              <option key={valley.ID} value={valley.lembah}>
                {valley.lembah}
              </option>
            ))}
          </select>
        </CountenerInput>

        <CountenerInput>
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
              <option key={village.id} value={village.name}>
                {village.name}
              </option>
            ))}
          </select>
        </CountenerInput>

        <ButtonFunc
          className="m-3 bg-primary text-white"
          // onClick={handleCreateSite}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Simpan"}
        </ButtonFunc>

        <ButtonFunc className="m-3 bg-tan" type="reset" onClick={handleReset}>
          Reset
        </ButtonFunc>
      </form>
    </div>
  );
}
