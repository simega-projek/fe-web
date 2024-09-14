import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useDebugValue,
} from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import { TextInput, Label, Button } from "flowbite-react";
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
import { toView } from "../../../utils/toView";
import {
  createValley,
  getOneValley,
  updateValley,
} from "../../../services/valley.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";

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

  const handleReset = () => {
    setLembah("");
    setProvince("");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    setSelectedRegency("");
    setSelectedDistrict("");
  };

  const handleCreateValley = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !lembah ||
        !province ||
        !regencies.length > 0 ||
        !districts.length > 0 ||
        !villages.length > 0
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
      formData.append("kecamatan", dataDistricts);

      try {
        setIsLoading(true);
        const res = await updateValley(id, formData);
        console.log(res);

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

      // console.log({ selectedDistrict, selectedRegency });
    },
    [
      lembah,
      province,
      selectedDistrict,
      selectedRegency,
      onSuccess,
      id,
      handleReset,
    ],
  );

  const fetchOneValley = useCallback(
    async (id) => {
      // handleReset();
      setIsLoading(true);
      try {
        const res = await getOneValley(id);
        const data = res?.data;
        setDataUpdate(data);
        setLembah(data?.lembah);
        setProvince(data?.provinsi);

        const dataRegencies = await getKabupaten(
          getDataByIndex(data?.kabupaten_kota, 2),
        );

        const regency = dataRegencies.find(
          (r) => r.name === getDataByIndex(data?.kabupaten_kota, 0),
        );
        console.log(dataRegencies);
        console.log(regency);
        setRegencies(regency);
        // setRegencies(data?.kabupaten_kota);
        // setDistricts(data?.kecamatan);
        setRegencies(
          Array.isArray(data?.kabupaten_kota) ? data.kabupaten_kota : [],
        );
        // setDistricts(data?.kecamatan);
        setDistricts(Array.isArray(data?.kecamatan) ? data?.kecamatan : []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

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
    const selectRegency = e.target.value;
    console.log(selectRegency);
    const regency = regencies.find((r) => r.name === selectRegency);

    setSelectedRegency(regency);
    if (regency) {
      const dataRegencies = await getKecamatan(regency.id);
      console.log({ dataRegencies });

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
    if (id) {
      fetchOneValley(id);
    }
  }, [id]);

  // console.log({ province });
  // console.log({ regencies });
  // console.log({ districts });
  // console.log({ villages });

  return (
    <>
      <div className={isOpenUpdate ? "block" : "hidden"}>
        <div className="flex justify-between">
          <TitleSection className="underline">Tambah Lembah</TitleSection>
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

        <form onSubmit={handleCreateValley} className="flex flex-wrap">
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              // ref={regencyRef}
              id="kabkota"
              placeholder="Pilih Kabupaten/Kota"
              onChange={handleRegencySelect}
              className="w-full rounded-md"
              disabled={isLoading}
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
              disabled={isLoading}
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

          <ButtonFunc
            className={`m-3 bg-primary text-white`}
            disabled={isLoading}
          >
            Simpan
          </ButtonFunc>
          <ButtonFunc className={`m-3 bg-tan`} onClick={handleReset}>
            Reset
          </ButtonFunc>
        </form>
      </div>
    </>
  );
}
