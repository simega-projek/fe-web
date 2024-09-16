import React, { useCallback, useEffect, useState } from "react";
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
import {
  createSite,
  getOneSite,
  updateSite,
} from "../../../services/site.service";

export default function UpdateSitus({ isOpenUpdate, onSuccess, onClose, id }) {
  const [siteName, setSiteName] = useState("");
  const [villages, setVillages] = useState([]);
  const [valleys, setValleys] = useState([]);

  const [selectedValley, setSelectedValley] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const [originalValley, setOriginalValley] = useState(null);
  const [originalVillage, setoriginalVillage] = useState(null);

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const handleReset = () => {
    setSiteName("");
    setSelectedValley(null);
    setSelectedVillage(null);
  };

  const handeUpdateSite = useCallback(
    async (e) => {
      e.preventDefault();

      if (siteName.trim() === "" || !selectedValley || !selectedVillage) {
        setMessageError("Semua kolom harus diisi");
        setMessageSuccess(null);
        toView("top");
        return;
      }

      const dataVillage = `${selectedVillage.name},${selectedVillage.id},${selectedVillage.district_id}`;
      // console.log({ selectedValley.id });
      // console.log(selectedValley.ID);
      // return;

      const formData = new FormData();
      formData.append("nama_situs", siteName);
      formData.append("desa_kelurahan", dataVillage);
      formData.append("lembah_id", selectedValley?.ID);

      try {
        setIsLoading(true);
        const res = await updateSite(id, formData);
        // console.log(res);
        // return;
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
            handleReset();
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
    },
    [siteName, selectedValley, selectedVillage, onSuccess, handleReset],
  );

  const fetchOneSite = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const res = await getOneSite(id);
        const data = res?.data;

        setDataUpdate(data);
        setSiteName(data?.nama_situs);
        // setSelectedValley(data?.lembah_id);

        // valleys
        const valley = valleys.find((v) => v.ID === data?.lembah_id);
        setSelectedValley(valley);

        // villages
        const kelurahan = data?.desa_kelurahan.split(",");
        const idKelurahan = kelurahan[2];
        const dataVillages = await getKelurahan(idKelurahan);
        const village = dataVillages.find((v) => v.id === kelurahan[1]);

        setVillages(dataVillages);
        setSelectedVillage(village);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  const fetchValley = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllValley();
      // console.log(res);
      setValleys(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [id, valleys]);

  const fetchVillages = async (valley) => {
    if (!valley) return;
    setIsLoading(true);
    try {
      let kecamatanId = getDataByIndex(valley.kecamatan, 1);

      const res = await getKelurahan(kecamatanId);

      setVillages(res); // Make sure the response is correct and an array
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValleyChange = (e) => {
    const selectedValleyName = e.target.value;
    const valley = valleys.find((v) => v.lembah === selectedValleyName);
    setSelectedValley(valley);
    fetchVillages(valley); // Fetch desa setelah lembah dipilih
  };

  const handleVillageChange = (e) => {
    const selectedVillageName = e.target.value;
    const village = villages.find((v) => v.name === selectedVillageName);
    setSelectedVillage(village);
  };

  // console.log(siteName);

  // console.log({ villages });
  // console.log({ selectedValley });
  // console.log({ selectedVillage });
  // console.log(dataUpdate);

  useEffect(() => {
    fetchValley();
  }, []);

  useEffect(() => {
    fetchOneSite(id);
  }, [id, fetchOneSite]);

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="flex justify-between">
        <TitleSection className="underline">Ubah Data Situs</TitleSection>
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
      <form onSubmit={handeUpdateSite} className="flex flex-wrap">
        <CountenerInput>
          <Label
            htmlFor="situs"
            value="Nama Situs"
            className="mb-2 block text-base"
          />
          <TextInput
            autoFocus
            id="situs"
            type="text"
            sizing="md"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
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
            onChange={handleValleyChange}
            value={selectedValley?.lembah ?? selectedValley ?? ""}
          >
            <option>Pilih Lembah</option>
            {valleys?.map((valley) => (
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
            onChange={handleVillageChange}
          >
            <option value="">Pilih Kelurahan</option>
            {villages?.map((village) => (
              <option key={village.id} value={village.name}>
                {village.name}
              </option>
            ))}
          </select>
        </CountenerInput>
      </form>
      <ButtonFunc
        className="m-3 bg-primary text-white"
        onClick={handeUpdateSite}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Simpan"}
      </ButtonFunc>
      <ButtonFunc className="m-3 bg-tan" type="button" onClick={onClose}>
        Batal
      </ButtonFunc>
    </div>
  );
}
