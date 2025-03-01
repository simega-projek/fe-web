import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import isLoading from "../../components/Elements/isLoading/isLoading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import TitleSection from "../../components/Elements/TitleSection";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import { CardKegiatanHome } from "../../components/Fragments/Cards/HomeCardKegiatan";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllEvent } from "../../services/event.service";

import AOS from "aos";
import "aos/dist/aos.css";

export default function KegiatanPage() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataEventsCS, setDataEventsCS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const events = await getAllEvent(50, debouncedSearch);
      setDataEvents(events.data);
      // console.log(events.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventsComingSoon = async () => {
    setIsLoading(true);
    try {
      const events = await getAllEvent(50, "Akan Datang");
      setDataEventsCS(events.data);
      // console.log(events.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedSearch]);

  useEffect(() => {
    fetchEventsComingSoon();
  }, []);

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

      <div className="mx-auto mt-5 w-full px-5 lg:w-1/2">
        <TextInput
          icon={FaSearch}
          placeholder="Cari Kegiatan..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="flex flex-col">
        {isLoading && (
          <div className="mx-auto mt-5">
            <isLoading />
          </div>
        )}

        <div
          className="flex flex-wrap justify-center gap-5 p-12"
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
                ></CardArtikel>
              ))
            : !isLoading && (
                <p className="my-5 text-center text-red-500">
                  data {search} tidak ditemukan
                </p>
              )}
        </div>
      </div>

      <div className="flex flex-col px-12">
        <div className="container">
          <TitleSection className="ps-5 pt-5">
            Kegiatan akan datang
          </TitleSection>
        </div>
        <div className="scrollbar flex gap-5 overflow-x-auto p-5">
          {isLoading && (
            <div className="mx-auto">
              <isLoading />
            </div>
          )}
          {dataEventsCS?.length > 0
            ? dataEventsCS
                ?.slice(0, 6)
                .map((item) => (
                  <CardKegiatanHome
                    to={`/kegiatan/${item.ID}/${item.title}`}
                    key={item?.ID}
                    title={item?.title}
                    className="flex-shrink-0 md:touch-pan-x"
                    date={item?.start_date}
                    img={item?.image}
                  />
                ))
            : !isLoading && (
                <p className="mx-auto my-5 text-center text-red-500">
                  data {search} tidak ditemukan
                </p>
              )}
        </div>
      </div>
    </>
  );
}
