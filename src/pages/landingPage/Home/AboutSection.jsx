import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// import required modules
import { useSelector } from "react-redux";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import bg from "/public/images/hero-img.jpg";
import formattedDate from "../../../utils/formattedDate";

export const AboutSection = () => {
  const articlesData = useSelector((state) => state.articles.data);
  const eventsData = useSelector((state) => state.events.data);
  const megalitData = useSelector((state) => state.megalith.data);

  // console.log({ articlesData });

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      autoplay={{
        delay: 2000000,
        disableOnInteraction: false,
      }}
      effect={"fade"}
      modules={[Pagination, Autoplay, EffectFade]}
      className="h-[50vh] w-full bg-tan md:h-96"
    >
      <SwiperSlide>
        <div className="relative h-full w-full">
          <img
            src={`/public/images/hero-img.jpg`}
            className="h-full w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="text-base text-white md:text-lg">
              <p className="mb-4 font-bold underline">Cagar Budaya Terbaru:</p>
              {megalitData?.slice(0, 3)?.map((megalith) => (
                <div
                  key={megalith?.ID}
                  className="mb-3 line-clamp-2 break-words"
                >
                  {formattedDate(megalith?.CreatedAt)} — {megalith?.nama_objek}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative h-full w-full">
          <img
            src={`/public/images/1.jpeg`}
            className="h-full w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="text-base text-white md:text-lg">
              <p className="mb-4 font-bold underline">Artikel Terbaru:</p>
              {articlesData?.slice(0, 3)?.map((article, index) => (
                <div
                  key={article?.ID}
                  className="mb-3 line-clamp-2 break-words"
                >
                  {formattedDate(article?.CreatedAt)} — {article?.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative h-full w-full">
          <img
            src={`/public/images/2.jpeg`}
            className="h-full w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="text-base text-white md:text-lg">
              <p className="mb-4 font-bold underline">Kegiatan Terbaru:</p>
              {eventsData?.slice(0, 3)?.map((event) => (
                <div key={event?.ID} className="mb-3 line-clamp-2 break-words">
                  {formattedDate(event?.CreatedAt)} — {event?.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
