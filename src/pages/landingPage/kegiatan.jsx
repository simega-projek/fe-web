import { Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import TitleSection from "../../components/Elements/TitleSection";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import { CardKegiatanHome } from "../../components/Fragments/Cards/HomeCardKegiatan";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllEvent } from "../../services/event.service";

import AOS from "aos";
import "aos/dist/aos.css";
import { PaginationPage } from "../../components/Fragments/Paginator/PaginationPage";
import { toView } from "../../utils/toView";

export default function KegiatanPage() {
  const [dataEvents, setDataEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);

  const [dataPage, setDataPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 8;

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchEvents = async () => {
    setisLoading(true);
    try {
      const events = await getAllEvent(
        CONTENT_PER_PAGE,
        debouncedSearch,
        currentPage,
      );
      // descending
      const sortedData = events.data.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
      );

      setDataEvents(sortedData);
      setFilteredEvents(sortedData);

      setDataPage(events?.pagination);
      setCurrentPage(events?.pagination?.currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const handleFilter = (e) => {
    const filterStatus = e.target.value;
    setFilter(filterStatus);
    if (filterStatus) {
      const filtered = dataEvents.filter(
        (item) => item.status === e.target.value,
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(dataEvents);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedSearch, currentPage]);

  return (
    <>
      <HeroSection className="h-80 md:h-96">
        <div className="text-center text-white">
          <h2 className="mb-5 max-w-xl text-xl font-semibold md:text-2xl">
            Kegiatan
          </h2>
          <TextBlink className="max-w-sm text-base">
            Pantau berbagai kegiatan menarik terkait Negeri 1000 Megalit di
            Sulawesi Tengah
          </TextBlink>
        </div>
      </HeroSection>

      {/* search and filter */}
      <FilterEvent
        search={search}
        onSearch={(e) => setSearch(e.target.value)}
        filter={filter}
        onFilter={handleFilter}
      />

      {/* data event */}
      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-2 justify-items-center gap-5 px-10 py-5 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
          >
            {Array.isArray(filteredEvents) && filteredEvents?.length > 0
              ? filteredEvents.map((item) => (
                  <CardArtikel
                    to={`/kegiatan/${item.ID}/${item.title}`}
                    key={item?.ID}
                    title={item?.title}
                    date={item?.start_date}
                    img={item?.image}
                    source={item?.users?.fullname}
                    status={item?.status}
                  ></CardArtikel>
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

const FilterEvent = ({ search, onSearch, filter, onFilter }) => {
  return (
    <div className="mx-auto mt-5 flex w-full gap-2 px-10 md:w-2/3">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-full"
      />
      <Select value={filter} onChange={onFilter} className="w-1/2">
        <option value={""}>Status</option>
        <option value={"Akan Datang"}>Akan Datang</option>
        <option value={"Proses"}>Sedang Berlangsung</option>
        <option value={"Selesai"}>Selesai</option>
      </Select>
    </div>
  );
};
