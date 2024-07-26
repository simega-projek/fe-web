import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { getAllMaps } from "../../services/maps.service";
import mapsData from "../../data/map.json";
import { PopupMap } from "../../components/Fragments/Cards/PopupMap";
import Loading from "../../components/Elements/Loading/Loading";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);
  const [search, setSearch] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fecthData();
  }, []);

  useEffect(() => {
    const result = maps.filter((m) =>
      m.sekolah.toLowerCase().includes(debounced.toLowerCase()),
    );
    setResultSearch(result);
  }, [debounced, maps]);
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

                {resultSearch.map((m) => (
                  <Marker position={[m.lintang, m.bujur]} key={m.id}>
                    <Popup>
                      <PopupMap
                        id={m.id}
                        titleObject={m.sekolah}
                        titleSitus={m.propinsi}
                      />
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:shadow-outline appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="Cari Megalit"
          />
          <button
            type="submit"
            className="rounded bg-primary px-4 py-2 font-bold text-white hover:shadow-lg"
          >
            Cari
          </button>
        </form>
      </div>

      <div className="mt-10 flex w-11/12 flex-wrap justify-center gap-5 md:w-full">
        {loading && (
          <div className="mx-auto">
            <Loading />
          </div>
        )}
        {resultSearch.map((m) => (
          <CardSitus
            key={m.id}
            title={m.sekolah}
            desc={m.propinsi}
            to={`/situs/${m.id}`}
          />
        ))}

        {!loading && resultSearch.length === 0 && (
          <p className="text-center">{search} tidak ditemukan</p>
        )}
      </div>
    </>
  );
}
