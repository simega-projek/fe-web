import React, { useEffect, useState } from "react";
import { EffectCoverflow, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonLink from "../../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../../components/Elements/TitleSection";

import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getAllEvent } from "../../../services/event.service";
import Aos from "aos";
export const EventSection = ({ data }) => {
  const [dataEvents, setDataEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchDataApi = async () => {
    setIsLoading(true);
    try {
      const events = await getAllEvent(10);
      setDataEvents(events.data);
      // console.log(events.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataApi();
  }, []);
  return (
    <section
      id="kegiatan"
      className="bg-tan bg-[url('/images/bg1.svg')] px-5 py-20"
    >
      <div
        className="mb-10 flex w-full items-center gap-5 px-5 md:px-10 lg:px-36"
        data-aos="slide-right"
      >
        <span className="h-px flex-1 bg-white"></span>
        <TitleSection className={"text-white"}>Program Kegiatan</TitleSection>
      </div>
      <div className="mb-10" data-aos="slide-up">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Scrollbar]}
          className="lg:w-3/4"
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide className="h-96 bg-cover bg-center" key={index}>
                  <SkletonCardEventHome />
                </SwiperSlide>
              ))
            : dataEvents?.map((keg) => (
                <SwiperSlide className="h-96 bg-cover bg-center" key={keg?.ID}>
                  <CardEventHome
                    to={`/kegiatan/${keg?.ID}/${keg?.title}`}
                    title={keg?.title}
                    img={keg?.image}
                    desc={keg?.description}
                    status={keg?.status}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div className="mt-10 flex w-full md:px-10 lg:ps-44">
        <ButtonLink
          to={`/kegiatan`}
          className={`w-1/2 rounded-none border-[3px] border-white bg-white text-sm text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white md:text-lg lg:w-fit lg:px-20`}
        >
          Ikuti Program
        </ButtonLink>
      </div>
    </section>
  );
};

const CardEventHome = ({ to, status, img, title }) => {
  return (
    <Link
      to={to}
      className="group relative block h-48 bg-black/50 transition-all duration-200 md:h-72"
    >
      <img
        alt=""
        src={img}
        className="absolute h-full w-full object-cover opacity-75 blur-sm transition-opacity group-hover:blur-none"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <div
          className={`w-fit px-2 text-sm font-bold uppercase tracking-widest ${status === "Akan Datang" ? "bg-green-100 text-green-800" : status === "Proses" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
        >
          {status}
        </div>
        <div
          className={`truncate text-ellipsis text-wrap break-words text-xl font-bold transition-all duration-200 sm:text-2xl ${status === "Akan Datang" ? "group-hover:bg-green-100 group-hover:text-green-800" : status === "Proses" ? "group-hover:bg-blue-100 group-hover:text-blue-800" : "group-hover:bg-gray-100 group-hover:text-gray-800"} p-1 capitalize text-white`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

const SkletonCardEventHome = () => {
  return (
    <>
      <div className="group relative block h-48 bg-white/70 transition-all duration-200 md:h-72">
        <div className="absolute h-full w-full object-cover opacity-75 blur-sm transition-opacity group-hover:blur-none" />

        <div className="relative flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
          <div className={`h-9 w-full animate-pulse rounded-full bg-white/90`}>
            {" "}
          </div>
          <div className={`h-7 w-1/2 animate-pulse rounded-full bg-white/90`}>
            {" "}
          </div>
        </div>
      </div>
    </>
  );
};
