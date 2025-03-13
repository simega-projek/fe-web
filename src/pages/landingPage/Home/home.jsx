import ButtonLink from "../../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../../components/Elements/TitleSection";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardArtikel from "../../../components/Fragments/Cards/CardArtikel";
import { CardKegiatanHome } from "../../../components/Fragments/Cards/HomeCardKegiatan";
import { CardSitusHome } from "../../../components/Fragments/Cards/HomeCardSitus";
import { HeroSection } from "../../../components/Fragments/Sections/Hero";
import { getAllArticles } from "../../../services/article.service";
import { getAllEvent } from "../../../services/event.service";
import { getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";

export default function HomePage() {
  const [dataObjects, setDataObjects] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [dataArticles, setDataArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);
  const fetchDataApi = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(4, "", 1, "", "", "", "public");
      setDataObjects(objects.data);
      // console.log(objects.data);

      const events = await getAllEvent(4);
      setDataEvents(events.data);
      // console.log(events.data);

      const articles = await getAllArticles(6);
      setDataArticles(articles.data);
      // console.log(articles.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(dataObjects);

  useEffect(() => {
    fetchDataApi();
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

      <section
        id="about"
        className="bg-tan bg-[url('/images/bg2.svg')] bg-no-repeat py-12"
      >
        <div className="container mx-auto w-11/12">
          <div className="flex flex-wrap">
            <div className="w-full px-6 lg:w-1/2">
              <div className="mx-auto flex md:w-5/6 lg:w-5/6">
                <h1 className="block text-left text-2xl font-black text-primary md:pl-10 md:text-4xl lg:pl-4 lg:text-4xl">
                  Sulawesi Tengah{" "}
                  <span className="block">Negeri 1000 Megalit</span>
                </h1>
              </div>

              <div className="group mx-auto mt-6 aspect-square overflow-hidden rounded-xl shadow-2xl md:w-3/4">
                <img
                  src="/images/hero-img.png"
                  className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                ></img>
              </div>
            </div>

            <div className="mx-auto w-full px-6 md:w-3/4 lg:w-1/2">
              <h2 className="mt-6 block w-1/2 rounded-lg bg-dark px-5 py-3 text-lg font-bold text-light lg:mt-[100px] lg:text-2xl">
                th. 2022
              </h2>

              <p className="mt-4 text-justify text-lg font-medium md:text-xl">
                Sulawesi Tengah dikenal sebagai "Negeri Seribu Megalit", karena
                merupakan rumah bagi ribuan peninggalan batu besar dari
                peradaban megalitik kuno. Situs-situs ini, yang tersebar di
                seluruh wilayah, menyimpan jejak sejarah dan budaya masyarakat
                purba yang hidup ribuan tahun lalu. Melalui upaya pelestarian
                dan pemanfaatan teknologi digital, kita dapat lebih memahami
                makna dari artefak-artefak bersejarah ini serta menjaga warisan
                budaya yang tak ternilai bagi generasi mendatang.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="situs"
        className="bg-tan bg-[url('/images/bg1.svg')] px-5 py-12"
      >
        <div className="container mx-auto">
          <TitleSection className="mb-5 text-center">Situs</TitleSection>
          <div className="mb-5 px-5 text-justify text-base font-semibold md:text-center md:text-lg">
            Situs objek peninggalan megalitikum di Sulawesi Tengah merupakan
            salah satu warisan budaya yang kaya, mencerminkan sejarah panjang
            peradaban manusia di wilayah ini. Seperti yang ditemukan di daerah
            Napu, Besoa, Lore Lindu, dan lainnya menampilkan berbagai bentuk
            artefak megalitikum, termasuk menhir, dolmen, dan arca yang diukir
            dengan detail. Keberadaan situs ini memberikan wawasan yang berharga
            tentang tradisi, kepercayaan, dan kehidupan masyarakat prasejarah di
            Sulawesi Tengah, serta pentingnya pelestarian warisan budaya untuk
            generasi mendatang.
          </div>
          <div
            data-aos="fade-up"
            className="mx-auto grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-10"
          >
            {dataObjects?.map((obj) => (
              <CardSitusHome
                date={obj?.UpdatedAt}
                key={obj?.ID}
                title={obj?.nama_objek}
                to={`/objek/${obj?.ID}/${obj?.nama_objek}`}
                desc={obj?.deskripsi}
                img={obj?.gambar}
              ></CardSitusHome>
            ))}
          </div>
          <div className="mx-auto mt-8 w-10/12 md:w-1/2 lg:mt-12">
            <ButtonLink
              to={`/persebaran`}
              className={`mx-auto border-[3px] border-primary transition-all duration-300 hover:bg-primary hover:text-white`}
            >
              Persebaran Megalitikum
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        id="kegiatan"
        className="bg-tan bg-[url('/images/bg1.svg')] px-5 py-12"
      >
        <div className="container mx-auto">
          <TitleSection className="mb-10 text-center">Kegiatan</TitleSection>
          <div className="flex flex-wrap gap-5 md:px-10 lg:flex-row-reverse lg:flex-nowrap">
            <div
              className="grid w-full grid-cols-2 gap-2 lg:w-1/2 lg:grid-cols-2"
              data-aos="fade-down"
            >
              {Array.isArray(dataEvents) &&
                dataEvents
                  ?.slice(0, window.innerWidth < 1024 ? 4 : 2)
                  .map((keg) => (
                    <CardKegiatanHome
                      to={`/kegiatan/${keg?.ID}/${keg?.title}`}
                      key={keg?.ID}
                      date={keg?.start_date}
                      title={keg?.title}
                      img={keg?.image}
                    />
                  ))}
            </div>
            <div className="mb-5 text-justify text-base font-semibold md:text-lg lg:w-1/2">
              Balai Pelestarian Kebudayaan (BPK) XVIII berperan penting dalam
              melestarikan dan mengembangkan warisan budaya Indonesia. Salah
              satu kegiatan utama yang dilakukan BPK adalah pengkajian dan
              penelitian terhadap situs-situs bersejarah, termasuk peninggalan
              arkeologi, seni, dan tradisi lokal. Selain itu, BPK 18 juga
              menyelenggarakan program edukasi dan pelatihan untuk meningkatkan
              kesadaran masyarakat tentang pentingnya pelestarian budaya.
              Melalui kegiatan-kegiatan ini, BPK 18 berkomitmen untuk menjaga
              keberagaman budaya dan sejarah Indonesia agar tetap hidup dan
              relevan di tengah perkembangan zaman.
            </div>
          </div>

          <div className="mx-auto w-10/12 md:w-1/2 lg:mt-12">
            <ButtonLink
              to={`/kegiatan`}
              className={`mx-auto border-[3px] border-primary transition-all duration-300 hover:bg-primary hover:text-white`}
            >
              Lihat Semua Kegiatan
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        id="artikel"
        className="bg-[url('/images/bg2.svg')] bg-no-repeat py-12"
      >
        <div className="">
          <div className="flex flex-wrap">
            <div className="mx-auto mb-10 w-full text-center lg:w-10/12 lg:text-start">
              <TitleSection>Artikel & Berita</TitleSection>
            </div>

            <div
              className="grid grid-cols-2 justify-items-center gap-2 px-5 md:grid-cols-3 md:px-10 lg:w-full lg:grid-cols-4"
              data-aos="zoom-in"
            >
              {dataArticles?.slice(0, 4).map((artikel) => (
                <CardArtikel
                  to={`/artikel/${artikel?.ID}/${artikel?.title}`}
                  img={artikel?.image}
                  key={artikel?.ID}
                  title={artikel?.title}
                  date={artikel?.CreatedAt}
                  source={artikel?.users?.fullname}
                />
              ))}
            </div>
            <div className="mx-auto mt-8 w-10/12 md:w-1/2">
              <ButtonLink
                to={`/artikel`}
                className={`mx-auto border-[3px] border-primary transition-all duration-300 hover:bg-primary hover:text-white`}
              >
                Lihat Artikel & Berita Lainnya
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
