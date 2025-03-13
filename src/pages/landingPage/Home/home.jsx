import "aos/dist/aos.css";

import { useLocation } from "react-router-dom";
import { HeroSection } from "../../../components/Fragments/Sections/Hero";
import { AboutSection } from "./AboutSection";
import { ArticleSection } from "./ArticleSection";
import { EventSection } from "./EventSection";
import { ObjectSection } from "./ObjectSection";
import { useEffect } from "react";
import { toView } from "../../../utils/toView";

export default function HomePage() {
  const { pathname } = useLocation();

  useEffect(() => {
    toView("top");
  }, [pathname]);

  return (
    <>
      <HeroSection>
        <div className="absolute left-0 my-auto flex px-6 md:justify-self-start">
          <div className="max-w-xl text-xl font-semibold text-white md:text-start md:text-2xl">
            Salam Budaya!
            <p className="mt-3">
              Selamat datang pada layanan Informasi Balai Pelestarian Kebudayaan
              Wilayah XVIII wilayah kerja Sulawesi Tengah dan Sulawesi Barat.
              Laman ini merupakan sarana informasi secara daring sebagai wujud
              dalam memenuhi keterbukaan dan hak informasi publik di Balai
              Pelestarian Kebudayaan Wilayah 18, sesuai dengan Undang-Undang
              Nomor 14 Tahun 2008.
            </p>
          </div>
        </div>
      </HeroSection>

      <AboutSection />

      <ObjectSection />

      <ArticleSection />
      <EventSection />
    </>
  );
}
