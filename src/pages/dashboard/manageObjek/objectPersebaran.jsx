import Aos from "aos";
import { Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import CardSitus from "../../../components/Fragments/Cards/CardSitus";
import { PopupMap } from "../../../components/Fragments/Cards/PopupMap";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { getAllValley } from "../../../services/valley.service";
import { getAllSite } from "../../../services/site.service";

export default function ObjectPersebaran() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObejcts, setDataObejcts] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [dataPage, setDataPage] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);

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
        contentPage,
        debouncedSearch,
        currentPage,
      );
      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt),
      );
      setDataObejcts(sortedData);
      setFilterObject(sortedData);
      setDataPage(objects.pagination);
      console.log(dataObejcts);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (e) => {
    const filterStatus = e.target.value;
    setFilter(filterStatus);
    if (filterStatus) {
      const filtered = dataObejcts.filter(
        (item) => item.publish === e.target.value,
      );
      setFilterObject(filtered);
    } else {
      setFilterObject(dataObejcts);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };
  useEffect(() => {
    fetchObjects();
  }, [debouncedSearch, currentPage, contentPage]);

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

      <div className="mt-5 flex w-full justify-between px-10">
        <FilterObject
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
          publish={filter}
          onPublish={handleFilter}
        />
        <FilterPage
          onChange={(e) => setContentPage(e.target.value)}
          value={contentPage}
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
            {filterObject?.length > 0
              ? filterObject?.map((o) => (
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

const FilterObject = ({
  search,
  onSearch,
  site,
  onSite,
  publish,
  onPublish,
  valley,
  onValley,
}) => {
  const [valleyData, setValleyData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  // const fetchDataFilter = async () => {
  //   try {
  //     const valley = await getAllValley();
  //     const site = await getAllSite();

  //     const sortValley = valley.data.sort((a, b) => {
  //       return a.lembah.localeCompare(b.lembah);
  //     });

  //     const sortSite = site.data.sort((a, b) => {
  //       return a.nama_situs.localeCompare(b.nama_situs);
  //     });

  //     setValleyData(sortValley);

  //     setSiteData(sortSite);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataFilter();
  // }, []);
  return (
    <div className="flex w-full gap-2 md:w-3/4">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-full"
      />

      {/* publish */}
      <Select value={publish} onChange={onPublish} className="w-1/3">
        <option value={""} className="bg-light">
          Status
        </option>
        <option value={"pending"}>Pending</option>
        <option value={"public"}>Publik</option>
        <option value={"private"}>Privat</option>
      </Select>

      {/* situs */}
      {/* <Select value={site} onChange={onSite} className="w-1/3">
        <option value={""} className="bg-light">
          Situs
        </option>

        {siteData?.map((s) => (
          <option value={s?.ID} key={s?.ID}>
            {s?.nama_situs}
          </option>
        ))}
      </Select> */}

      {/* lembah */}
      {/* <Select value={valley} onChange={onValley} className="w-1/3">
        <option value={""} className="bg-light">
          Lembah
        </option>

        {valleyData?.map((d) => (
          <option value={d?.ID} key={d?.ID}>
            {d?.lembah}
          </option>
        ))}
      </Select> */}
    </div>
  );
};
