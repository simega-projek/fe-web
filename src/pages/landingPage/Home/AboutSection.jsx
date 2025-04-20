import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

export const AboutSection = () => {
  return (
    // <section
    //   id="about"
    //   className="bg-tan bg-[url('/images/bg2.png')] bg-no-repeat py-12"
    // >
    //   <div className="container mx-auto w-11/12">
    //     <div className="flex flex-wrap">
    //       <div className="w-full px-6 lg:w-1/2">
    //         <div className="mx-auto flex md:w-5/6 lg:w-5/6">
    //           <h1 className="block text-left text-2xl font-black text-primary md:pl-10 md:text-4xl lg:pl-4 lg:text-4xl">
    //             Sulawesi Tengah{" "}
    //             <span className="block">Negeri 1000 Megalit</span>
    //           </h1>
    //         </div>

    //         <div className="group mx-auto mt-6 aspect-square overflow-hidden rounded-xl shadow-2xl md:w-3/4">
    //           <img
    //             src="/images/hero-img.jpg"
    //             className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110"
    //           ></img>
    //         </div>
    //       </div>

    //       <div className="mx-auto w-full px-6 md:w-3/4 lg:w-1/2">
    //         <h2 className="mt-6 block w-1/2 rounded-lg bg-dark px-5 py-3 text-lg font-bold text-light lg:mt-[100px] lg:text-2xl">
    //           th. 2022
    //         </h2>

    //         <p className="mt-4 text-justify text-lg font-medium md:text-xl">
    //           Sulawesi Tengah dikenal sebagai "Negeri Seribu Megalit", karena
    //           merupakan rumah bagi ribuan peninggalan batu besar dari peradaban
    //           megalitik kuno. Situs-situs ini, yang tersebar di seluruh wilayah,
    //           menyimpan jejak sejarah dan budaya masyarakat purba yang hidup
    //           ribuan tahun lalu. Melalui upaya pelestarian dan pemanfaatan
    //           teknologi digital, kita dapat lebih memahami makna dari
    //           artefak-artefak bersejarah ini serta menjaga warisan budaya yang
    //           tak ternilai bagi generasi mendatang.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      effect={"fade"}
      modules={[Pagination, Autoplay, EffectFade]}
      className="h-96 w-full bg-tan"
    >
      <SwiperSlide>
        <img
          src="/public/images/hero-img.jpg"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/public/images/1.jpeg"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/public/images/2.jpeg"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/public/images/3.jpeg"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/public/images/4.jpeg"
          className="h-full w-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};
