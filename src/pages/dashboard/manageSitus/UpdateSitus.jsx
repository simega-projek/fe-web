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
  const [villageData, setVillageData] = useState([]);
  const [valleyData, setValleyData] = useState([]);

  const [selectedValley, setSelectedValley] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [originalValley, setOriginalValley] = useState(null);
  const [originalVillage, setoriginalVillage] = useState(null);

  const [fetchLoading, setFetchLoading] = useState(false);
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

      if (
        siteName.trim() === "" ||
        selectedValley === null ||
        selectedVillage === null
      ) {
        setMessageError("Semua kolom harus diisi");
        setMessageSuccess(null);
        toView("top");
        return;
      }

      const formData = new FormData();
      formData.append("nama_situs", siteName);
      formData.append("desa_kelurahan", selectedVillage || originalVillage);
      formData.append("lembah_id", selectedValley["ID"] || originalValley);

      try {
        setIsLoading(true);
        const res = await updateSite(id, formData);
        // console.log("hasil create: " + res);
        if (res.error) {
          setMessageError(res.messageError);
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
              onclose;
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

  // const fetchVillages = async (valley) => {
  //   if (!valley) return;
  //   setFetchLoading(true);
  //   try {
  //     let kecamatanId = getDataByIndex(valley.kecamatan, 1); // Ambil ID kecamatan dari lembah
  //     const res = await getKelurahan(kecamatanId); // Fetch data desa berdasarkan kecamatan ID
  //     setVillageData(res);

  //     // Update selected village based on the original data
  //     const villageName = getDataByIndex(originalVillage, 0);
  //     const village = res.find((v) => v.name === villageName);
  //     setSelectedVillage(village);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setFetchLoading(false);
  //   }
  // };

  const fetchOneSite = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const res = await getOneSite(id);
        const data = res?.data;
        console.log(res.data);

        // original data
        setOriginalValley(data?.lembah_id);
        setoriginalVillage(data?.desa_kelurahan);

        setDataUpdate(data?.data);
        setSiteName(data?.nama_situs);

        setSelectedValley(data?.lembah.lembah);
        setSelectedVillage(getDataByIndex(data?.desa_kelurahan, 0));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  // Fetch semua data lembah

  // const fetchOneSite = useCallback(
  //   async (id) => {
  //     setIsLoading(true);
  //     try {
  //       const res = await getOneSite(id);
  //       const data = res?.data;
  //       console.log(res.data);

  //       // original data
  //       setOriginalValley(data?.lembah_id);
  //       setoriginalVillage(data?.desa_kelurahan);

  //       setDataUpdate(data?.data);
  //       setSiteName(data?.nama_situs);

  //       // Find and set the selected valley
  //       const valley = valleyData.find((v) => v.ID === data?.lembah_id);
  //       setSelectedValley(valley);

  //       // Fetch villages based on the selected valley
  //       if (valley) {
  //         await fetchVillages(valley);
  //       }

  //       // Set selected village based on desa_kelurahan
  //       const villageName = getDataByIndex(data?.desa_kelurahan, 0);
  //       const village = villageData.find((v) => v.name === villageName);
  //       setSelectedVillage(village);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [id],
  // );

  const fetchValley = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await getAllValley();
      // console.log(res);
      setValleyData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  }, [id, valleyData]);

  const fetchVillages = async (valley) => {
    if (!valley) return;
    setFetchLoading(true);
    try {
      let kecamatanId = getDataByIndex(valley.kecamatan, 1);

      const res = await getKelurahan(kecamatanId);
      setVillageData(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  // const handleValleyChange = (e) => {
  //   const selectedValleyName = e.target.value;
  //   const valley = valleyData.find((v) => v.lembah === selectedValleyName);
  //   setSelectedValley(valley);
  //   fetchVillages(valley);
  // };

  // const handleVillageChange = (e) => {
  //   const selectedVillageName = e.target.value;
  //   const village = villageData.find((v) => v.name === selectedVillageName);
  //   // console.log(village);
  //   setSelectedVillage(village);
  // };

  const handleValleyChange = (e) => {
    const selectedValleyName = e.target.value;
    const valley = valleyData.find((v) => v.lembah === selectedValleyName);
    setSelectedValley(valley);
    fetchVillages(valley); // Fetch desa setelah lembah dipilih
  };

  const handleVillageChange = (e) => {
    const selectedVillageName = e.target.value;
    const village = villageData.find((v) => v.name === selectedVillageName);
    setSelectedVillage(village);
  };

  useEffect(() => {
    fetchValley();
  }, []);

  useEffect(() => {
    fetchOneSite(id);
  }, [id, fetchOneSite]);

  // console.log(siteName);

  // console.log({ villageData });
  // console.log({ selectedValley });
  // console.log({ selectedVillage });

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
            value={selectedValley?.lembah ?? selectedValley ?? "-"}
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
          {/* <select
            id="kelurahan"
            placeholder="Pilih Kelurahan"
            className="w-full rounded-md"
            value={selectedVillage ?? selectedVillage?.name ?? "-"}
            onChange={handleVillageChange}
          >
            <option>Pilih Kelurahan</option>
            {villageData?.map((village) => (
              <option key={village.id} value={village.name}>
                {village.name}
              </option>
            ))}
          </select> */}
          <select
            id="kelurahan"
            placeholder="Pilih Kelurahan"
            className="w-full rounded-md"
            value={selectedVillage?.name ?? ""}
            onChange={handleVillageChange}
          >
            <option value="">Pilih Kelurahan</option>
            {villageData.map((village) => (
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
      <ButtonFunc className="m-3 bg-tan" type="button" onClick={onclose}>
        Batal
      </ButtonFunc>
    </div>
  );
}
