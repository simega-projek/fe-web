import Aos from "aos";
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
import { toView } from "../../utils/toView";
import { FilterObject } from "../dashboard/managePublication/FilterPublication";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObejcts, setDataObejcts] = useState([]);
  const [dataPage, setDataPage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 8;

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");

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
        valley,
        site,
        category,
        "pending",
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

  const handleResetFilter = () => {
    setSearch("");
    setValley("");
    setSite("");
    setCategory("");
  };

  useEffect(() => {
    fetchObjects();
  }, [debouncedSearch, currentPage, valley, site, category]);

  return (
    <>
      <div>
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

      <div className="mt-5 flex w-full justify-center px-10">
        <FilterObject
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
          valley={valley}
          onValley={(e) => setValley(e.target.value)}
          site={site}
          onSite={(e) => setSite(e.target.value)}
          category={category}
          onCategory={(e) => setCategory(e.target.value)}
          onReset={handleResetFilter}
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
                  <div className="col-span-2 text-center text-red-500 md:col-span-3 lg:col-span-4">
                    data {search} tidak ditemukan
                  </div>
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
            totalItems={dataPage?.totalItems}
          />
        )}
      </div>
    </>
  );
}
