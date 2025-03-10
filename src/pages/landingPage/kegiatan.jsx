import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllEvent } from "../../services/event.service";

import AOS from "aos";
import "aos/dist/aos.css";
import { PaginationPage } from "../../components/Fragments/Paginator/PaginationPage";
import { toView } from "../../utils/toView";
import { FilterEvent } from "../dashboard/manageActivities/FilterEvent";

export default function KegiatanPage() {
  const [dataEvents, setDataEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // search and filter
  const [searchData, setSearchData] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 1000);

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
        status,
      );
      // descending
      const sortedData = events.data.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
      );

      setDataEvents(sortedData);

      setDataPage(events?.pagination);
      setCurrentPage(events?.pagination?.currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedSearch, currentPage, status]);

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
      <div className="mt-5 flex w-full justify-center px-10">
        <FilterEvent
          search={searchData}
          onSearch={(e) => setSearchData(e.target.value)}
          status={status}
          onStatus={(e) => setStatus(e.target.value)}
        />
      </div>

      {/* data event */}
      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-2 justify-items-center gap-5 px-10 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
          >
            {Array.isArray(dataEvents) && dataEvents?.length > 0
              ? dataEvents.map((item) => (
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
                  <div className="col-span-2 text-center text-red-500 md:col-span-3 lg:col-span-4">
                    data {searchData} tidak ditemukan
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
