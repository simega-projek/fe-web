import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ContainerInput } from "../../../components/Elements/Inputs/ContainerInput";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { getOneSite, updateSite } from "../../../services/site.service";
import { getAllValley } from "../../../services/valley.service";
import {
  getKecamatan,
  getKelurahan,
} from "../../../services/wilIndonesia.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { toView } from "../../../utils/toView";
import { BtnUpdateForm } from "../../../components/Elements/Buttons/BtnUpdateForm";

export default function UpdateSitus({ isOpenUpdate, onSuccess, onClose, id }) {
  const [siteName, setSiteName] = useState("");
  const [valleys, setValleys] = useState([]);
  const [villages, setVillages] = useState([]);
  const [districts, setDistricts] = useState([]); // Kecamatan

  const [selectedValley, setSelectedValley] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(""); //kecamatan

  const [originalValley, setOriginalValley] = useState(null);
  const [originalVillage, setoriginalVillage] = useState(null);

  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const handleReset = () => {
    setSiteName("");
    setSelectedValley("");
    setSelectedVillage("");
    setSelectedDistrict("");
  };

  const handeUpdateSite = async (e) => {
    e.preventDefault();

    if (siteName.trim() === "" || !selectedValley || !selectedVillage) {
      setMessageError("Semua kolom harus diisi");
      setMessageSuccess(null);
      toView("top");
      return;
    }

    const dataVillage = `${selectedVillage.name},${selectedVillage.id},${selectedVillage.district_id}`;
    const dataDistrict =
      selectedDistrict["name"] +
      "," +
      selectedDistrict["id"] +
      "," +
      selectedDistrict["regency_id"];
    // console.log({ selectedValley.id });
    // console.log(selectedValley.ID);
    // return;

    const formData = new FormData();
    formData.append("nama_situs", siteName);
    formData.append("lembah_id", selectedValley?.ID);
    formData.append("kecamatan", dataDistrict);
    formData.append("desa_kelurahan", dataVillage);

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
  };

  const fetchOneSite = async () => {
    setIsLoading(true);
    try {
      const res = await getOneSite(id);
      const data = res?.data;

      setDataUpdate(data);
      setSiteName(data?.nama_situs);
      // setSelectedValley(data?.lembah_id);

      // valleys
      const valley = valleys.find((v) => v?.ID === data?.lembah_id);
      setSelectedValley(valley);

      // villages
      const kelurahan = data?.desa_kelurahan.split(",");
      const idKelurahan = kelurahan[2];
      const dataVillages = await getKelurahan(idKelurahan);
      const village = dataVillages.find((v) => v?.id === kelurahan[1]);

      // kecamatan
      const kecamatan = data?.kecamatan.split(",");
      const idKecamatan = kecamatan[2];
      const dataKecamatan = await getKecamatan(idKecamatan);
      const district = dataKecamatan.find((v) => v?.id === kecamatan[1]);
      // console.log({ dataKecamatan });
      // console.log({ idKecamatan });
      // console.log({ dataKecamatan });
      // console.log({ district });

      setDistricts(dataKecamatan);
      setVillages(dataVillages);
      setSelectedVillage(village);
      setSelectedDistrict(district);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchValley = async () => {
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
    const valley = valleys.find((v) => v?.lembah === selectedValleyName);
    setSelectedValley(valley);
    setDistricts([]);
    setVillages([]);
    fetchDistrict(valley);
    // fetchVillages(valley); // Fetch desa setelah lembah dipilih
  };

  const handleVillageChange = (e) => {
    const selectedVillageName = e.target.value;
    const village = villages.find((v) => v?.name === selectedVillageName);
    setSelectedVillage(village);
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    const district = districts.find((d) => d.name === selectedDistrict);

    // console.log({ district });
    setSelectedDistrict(district);
    if (district) {
      const dataDistricts = await getKelurahan(district?.id);
      // console.log({ dataDistricts });
      setVillages(dataDistricts);
    }
  };
  // console.log(siteName);

  // console.log({ villages });
  // console.log({ selectedValley });
  // console.log({ selectedVillage });
  // console.log(dataUpdate);
  const handleBtnCancel = () => {
    onClose();
    if (isLoading) window.location.reload();
  };

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  useEffect(() => {
    fetchValley();
  }, []);

  useEffect(() => {
    if (id) fetchOneSite(id);
  }, [id]);

  useEffect(() => {
    activeRef.current.focus();
  }),
    [];

  return (
    <div className={isOpenUpdate ? "block" : "hidden"}>
      <div className="mb-2 flex justify-between">
        <TitleSection className="underline">Ubah Data Situs</TitleSection>
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
      <form onSubmit={handeUpdateSite} className="flex flex-wrap">
        {/* nama situs */}
        <ContainerInput>
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
            ref={activeRef}
          />
        </ContainerInput>

        {/* lembah */}
        <ContainerInput>
          <Label
            htmlFor="lembah"
            value="Nama Lembah / Wilayah"
            className="mb-2 block text-base"
          />
          <select
            id="lembah"
            placeholder="Pilih Lembah / Wilayah"
            className="w-full rounded-md"
            onChange={handleValleyChange}
            value={selectedValley?.lembah ?? selectedValley ?? ""}
          >
            <option>Pilih Lembah / Wilayah</option>
            {valleys?.map((valley) => (
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
            value={selectedDistrict?.name ?? ""}
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
            onChange={handleVillageChange}
          >
            <option value="">Pilih Kelurahan</option>
            {villages?.map((village) => (
              <option key={village?.id} value={village?.name}>
                {village?.name}
              </option>
            ))}
          </select>
        </ContainerInput>
      </form>
      <BtnUpdateForm
        handleUpdate={handeUpdateSite}
        handleCancle={handleBtnCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
