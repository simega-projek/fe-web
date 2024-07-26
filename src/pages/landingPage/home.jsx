import ButtonLink from "../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../components/Elements/TitleSection";
import CardKegiatan from "../../components/Fragments/Cards/HomeCardKegiatan";
import CardSitusHome from "../../components/Fragments/Cards/HomeCardSitus";
import CardArtikel from "../../components/Fragments/Cards/HomeCardArtikel";
import Footer from "../../components/Fragments/Footer/Footer";

import artikelData from "../../data/artikel.json";
import situsData from "../../data/situs.json";
import kegiatanData from "../../data/kegiatan.json";
import { HeroSection } from "../../components/Fragments/Sections/Hero";

export default function HomePage() {
  return (
    <>
      <HeroSection>
        <div className="absolute left-0 px-6 md:justify-self-start">
          <p className="max-w-xl text-xl font-semibold text-white md:text-start md:text-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla,
            harum?, sed.
          </p>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus sed inventore quae unde, aspernatur accusantium iure
                temporibus veniam. Magnam, culpa? Cum exercitationem in nisi
                soluta sequi debitis natus mollitia qui? Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Adipisci voluptas eveniet
                consequatur laudantium delectus voluptatibus veritatis corporis,
                cum et? Tempore!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="situs" className="bg-tan bg-[url('/images/bg1.svg')] py-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full text-center md:mb-5">
              <TitleSection>Situs</TitleSection>
            </div>
            <div className="mx-auto flex w-10/12 flex-wrap justify-center gap-3 md:gap-5 lg:w-full lg:gap-0">
              {situsData.slice(0, 3).map((situs) => (
                <CardSitusHome
                  key={situs._id}
                  title={situs.title}
                  to={`/situs/${situs._id}`}
                >
                  {situs.content}
                </CardSitusHome>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="kegiatan"
        className="bg-tan bg-[url('/images/bg1.svg')] py-20"
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="mb-10 w-full text-center">
              <TitleSection>Kegiatan</TitleSection>
            </div>
            <div className="mx-auto flex w-8/12 flex-wrap gap-10 md:w-full md:justify-center lg:w-full">
              {kegiatanData.slice(0, 3).map((keg) => (
                <CardKegiatan key={keg._id} date={keg.date} title={keg.title} />
              ))}
            </div>
            <div className="mt-8 w-8/12">
              <ButtonLink
                to={`/kegiatan`}
                className={`mx-auto border-[3px] border-primary transition-all duration-300 hover:bg-primary hover:text-white lg:w-6/12`}
              >
                Lihat Semua Kegiatan
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="artikel"
        className="bg-[url('/images/bg2.svg')] bg-no-repeat py-20"
      >
        <div className="">
          <div className="flex flex-wrap">
            <div className="mx-auto mb-10 w-full text-center lg:w-10/12 lg:text-start">
              <TitleSection>Artikel & Berita</TitleSection>
            </div>

            <div className="mx-auto flex w-10/12 flex-wrap justify-center gap-5 lg:w-full">
              {artikelData.slice(0, 4).map((artikel) => (
                <CardArtikel
                  to={`/artikel`}
                  image={artikel.image}
                  key={artikel._id}
                  title={artikel.title}
                  date={artikel.date}
                >
                  {artikel.content}
                </CardArtikel>
              ))}
            </div>
            <div className="mx-auto mt-8 w-10/12 lg:w-8/12">
              <ButtonLink
                to={`/artikel`}
                className={`mx-auto border-[3px] border-primary transition-all duration-300 hover:bg-primary hover:text-white lg:w-6/12`}
              >
                Lihat Semua Kegiatan
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
