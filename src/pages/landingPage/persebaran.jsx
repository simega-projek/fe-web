import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { PopupMap } from "../../components/Fragments/Cards/PopupMap";
import { getAllObject } from "../../services/object.service";
import { getAllSite } from "../../services/site.service";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    try {
      const objects = await getAllObject(50, debouncedSearch);
      setDataObejcts(objects.data);
      // console.log(objects);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
                {dataObejcts?.map((o) => (
                  <Marker position={[o.lintang, o.bujur]} key={o.ID}>
                    <Popup>
                      <PopupMap
                        id={o.ID}
                        titleObject={o.nama_objek}
                        titleSitus={o.site?.nama_situs}
                        img={o.gambar}
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
        {isLoading && (
          <div className="mx-auto">
            <Loading />
          </div>
        )}
        <div className="flex size-auto flex-wrap justify-center gap-5 px-5 pb-5">
          {dataObejcts?.length > 0
            ? dataObejcts?.map((o) => (
                <CardSitus
                  key={o?.ID}
                  title={o?.nama_objek}
                  desc={o?.propinsi}
                  to={`/objek/${o?.ID}/${o?.nama_objek}`}
                  img={o?.gambar}
                  category={o?.category.category}
                  publish={"Publik"}
                />
              ))
            : !isLoading && (
                <p className="my-5 text-center text-red-500">
                  data {search} tidak ditemukan
                </p>
              )}
        </div>
      </div>
    </>
  );
}
