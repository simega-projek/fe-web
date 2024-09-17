import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Modal, TextInput } from "flowbite-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { getAllMaps } from "../../services/maps.service";
import mapsData from "../../data/map.json";
import { PopupMap } from "../../components/Fragments/Cards/PopupMap";
import Loading from "../../components/Elements/Loading/Loading";
import { ButtonFunc } from "../../components/Elements/Buttons/ButtonFunc";
import { getAllObject } from "../../services/object.service";
import { getAllCategory } from "../../services/category.service";
import { getAllSite } from "../../services/site.service";
import { FaSearch } from "react-icons/fa";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [resultSearch, setResultSearch] = useState([]);

  const [categories, setCategories] = useState([]);
  const [dataSites, setDataSites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [dataObejcts, setDataObejcts] = useState([]);

  const [debouncedSearch] = useDebounce(search, 1000);

  const fetchObjects = async () => {
    setLoading(true);
    try {
      const objects = await getAllObject(50, debouncedSearch);
      setDataObejcts(objects.data);
      // console.log(objects);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSites = async () => {
    try {
      const sites = await getAllSite();
      setDataSites(sites?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  useEffect(() => {
    fetchObjects();
  }, [debouncedSearch]);

  // const fetchMarkers = useMemo(
  //   () =>
  //     dataObejcts.map((o) => (
  //       <Marker position={[o?.lintang, o?.bujur]} key={o?.ID}>
  //         <Popup>
  //           <PopupMap
  //             id={o?.ID}
  //             titleObject={o?.nama_objek}
  //             titleSitus={o?.site?.nama_situs}
  //             desc=""
  //           />
  //         </Popup>
  //       </Marker>
  //     )),
  //   [],
  // );

  return (
    <>
      <div className="pb-16">
        <div className="mx-auto">
          <div className="flex w-full flex-wrap justify-center">
            <div className="w-full">
              <MapContainer center={lokasi} zoom={7} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Indonesia</a> peta'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dataObejcts.map((o) => (
                  <Marker position={[o?.lintang, o?.bujur]} key={o?.ID}>
                    <Popup>
                      <PopupMap
                        id={o?.ID}
                        titleObject={o?.nama_objek}
                        titleSitus={o?.site?.nama_situs}
                        img={o?.gambar}
                        desc=""
                      />
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 w-full px-5 lg:w-1/2">
        <TextInput
          icon={FaSearch}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Megalit..."
        />
      </div>

      <div className="mt-10">
        {loading && (
          <div className="mx-auto">
            <Loading />
          </div>
        )}
        <div className="flex size-auto flex-wrap justify-center gap-5 px-5 pb-5">
          {dataObejcts?.length > 0 &&
            dataObejcts?.map((o) => (
              <CardSitus
                key={o?.ID}
                title={o?.nama_objek}
                desc={o?.propinsi}
                to={`/objek/${o?.ID}/${o?.nama_objek}`}
                img={o?.gambar}
              />
            ))}
        </div>

        {loading && dataObejcts.length === 0 && (
          <p className="my-5 text-center text-red-500">
            {search} tidak ditemukan
          </p>
        )}
      </div>
    </>
  );
}
