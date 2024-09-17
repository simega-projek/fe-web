import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Modal } from "flowbite-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { getAllMaps } from "../../services/maps.service";
import mapsData from "../../data/map.json";
import { PopupMap } from "../../components/Fragments/Cards/PopupMap";
import Loading from "../../components/Elements/Loading/Loading";
import { ButtonFunc } from "../../components/Elements/Buttons/ButtonFunc";

export default function PersebaranPage2() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [resultSearch, setResultSearch] = useState([]);

  const [debounced] = useDebounce(search, 1000);

  const fecthData = async () => {
    setLoading(true);
    try {
      const getMaps = await getAllMaps();
      setMaps(getMaps);
      setResultSearch(getMaps);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(() => {
    const result = maps.filter((m) => {
      const resulSearch =
        m?.kecamatan.toLowerCase().includes(debounced.toLowerCase()) ||
        m?.sekolah.toLowerCase().includes(debounced.toLowerCase());

      let resultFilter = filter === "all" || m?.bentuk.toLowerCase() === filter;
      if (!filter) {
        return (resultFilter = m?.bentuk.toLowerCase().includes(filter));
      }
      return resulSearch && resultFilter;
    });
    setResultSearch(result);
  }, [debounced, filter, maps]);

  useEffect(() => {
    handleSearch();
  }, [debounced, filter, maps]);

  useEffect(() => {
    fecthData();
  }, []);

  const markers = useMemo(
    () =>
      resultSearch.map((m) => (
        <Marker position={[m?.lintang, m?.bujur]} key={m?.id}>
          <Popup>
            <PopupMap
              id={m?.id}
              titleObject={m?.sekolah}
              titleSitus={m?.propinsi}
            />
          </Popup>
        </Marker>
      )),
    [resultSearch],
  );

  return (
    <>
      <div className="pb-16">
        <div className="mx-auto">
          <div className="flex w-full flex-wrap justify-center">
            <div className="w-full">
              <MapContainer center={lokasi} zoom={7} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-10/12 justify-center md:max-w-md lg:max-w-xl">
        <select
          id="filter"
          placeholder="Filter"
          className="rounded-s"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">ALL</option>
          <option value="sd">SD</option>
          <option value="smp">SMP</option>
          <option value="sma">SMA</option>
          <option value="smk">SMK</option>
        </select>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="focus:shadow-outline w-full appearance-none border px-3 py-2 leading-tight text-gray-700 shadow"
          placeholder="Cari Megalit"
        />
        <ButtonFunc className="flex items-center justify-center rounded-s-none pe-5">
          <i className="">
            <svg
              className="text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </i>
          <span>Cari</span>
        </ButtonFunc>
      </div>

      <div className="mt-10">
        {loading && (
          <div className="mx-auto">
            <Loading />
          </div>
        )}
        <div className="flex size-auto flex-wrap justify-center gap-5 px-5 pb-5">
          {resultSearch.map((m) => (
            <CardSitus
              key={m?.id}
              title={m?.sekolah}
              desc={m?.propinsi}
              to={`/objek/${m?.id}/${m?.sekolah}`}
            />
          ))}
        </div>

        {!loading && resultSearch.length === 0 && (
          <p className="text-center">{search} tidak ditemukan</p>
        )}
      </div>
    </>
  );
}
