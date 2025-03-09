import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { PopupMap } from "../../components/Fragments/Cards/PopupMap";
import { PaginationPage } from "../../components/Fragments/Paginator/PaginationPage";
import { getAllObject } from "../../services/object.service";
import { getAllSite } from "../../services/site.service";
import { toView } from "../../utils/toView";
import Aos from "aos";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObejcts, setDataObejcts] = useState([]);
  const [dataPage, setDataPage] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 8;

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchObjects = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(
        CONTENT_PER_PAGE,
        debouncedSearch,
        currentPage,
      );
      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt),
      );
      setDataObejcts(sortedData);
      setDataPage(objects.pagination);
      console.log(dataObejcts);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };
  useEffect(() => {
    fetchObjects();
  }, [debouncedSearch, currentPage]);

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
      <div className="">
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

      <div className="mx-auto mt-5 w-full px-10 md:w-1/2">
        <TextInput
          icon={FaSearch}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Megalit..."
        />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-2 justify-items-center gap-5 px-10 py-5 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
          >
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
                  <p className="my-5 text-red-500">
                    data {search} tidak ditemukan
                  </p>
                )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mb-5 flex flex-col items-center justify-center">
        {isLoading ? null : (
          <PaginationPage
            currentPage={currentPage}
            totalPages={dataPage?.totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
}
