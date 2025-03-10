import Aos from "aos";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import CardSitus from "../../../components/Fragments/Cards/CardSitus";
import { PopupMap } from "../../../components/Fragments/Cards/PopupMap";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";
import { FilterObject } from "./FilterObjek";

export default function ObjectPersebaran() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObjects, setDataObjects] = useState([]);

  const [dataPage, setDataPage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(12);

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [publish, setPublish] = useState("");
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [filterSite, setFilterSite] = useState(null);
  const [category, setCategory] = useState("");

  const fetchObjects = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(
        contentPage,
        debouncedSearch,
        currentPage,
        valley,
        site,
        category,
        publish,
      );
      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt),
      );
      setDataObjects(sortedData);

      setDataPage(objects.pagination);
      // console.log(dataObjects);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilter = () => {
    setSearch("");
    setPublish("");
    setValley("");
    setSite("");
    setCategory("");
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleValley = (e) => {
    const value = e.target.value; // Get the selected value
    const selectedIndex = e.target.selectedIndex; // Get the index of the selected option
    const title = e.target.options[selectedIndex].title;
    setValley(value);
    setFilterSite(title);
  };
  useEffect(() => {
    fetchObjects();
  }, [
    debouncedSearch,
    currentPage,
    contentPage,
    publish,
    valley,
    site,
    category,
  ]);

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
                {dataObjects?.map((o) => (
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

      <div className="mt-5 flex w-full justify-between">
        <FilterObject
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
          valley={valley}
          onValley={handleValley}
          site={site}
          onSite={(e) => setSite(e.target.value)}
          category={category}
          onCategory={(e) => setCategory(e.target.value)}
          publish={publish}
          onPublish={(e) => setPublish(e.target.value)}
          onReset={handleResetFilter}
          filterSite={filterSite}
        />

        <FilterPage
          onChange={(e) => setContentPage(e.target.value)}
          value={contentPage}
        />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-2 justify-items-center gap-5 py-5 md:grid-cols-3 lg:grid-cols-4">
            {dataObjects?.length > 0
              ? dataObjects?.map((o) => (
                  <CardSitus
                    key={o?.ID}
                    title={o?.nama_objek}
                    desc={o?.propinsi}
                    to={`/objek/${o?.ID}/${o?.nama_objek}`}
                    img={o?.gambar}
                    category={o?.category.category}
                    publish={o?.publish}
                  />
                ))
              : !isLoading && (
                  <div className="col-span-2 text-red-500 md:col-span-3 lg:col-span-4">
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
