import { useEffect, useState } from "react";
import TitleSection from "../../components/Elements/TitleSection";
import CardArtikel from "../../components/Fragments/Cards/HomeCardArtikel";
import CardKegiatan from "../../components/Fragments/Cards/HomeCardKegiatan";
import { Pagination } from "../../components/Fragments/Pagination";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllArticles } from "../../services/artikel.service";
import kegiatanData from "../../data/kegiatan.json";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
export default function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fecthData = async () => {
      try {
        const getArtikel = await getAllArticles();
        setKegiatan(getArtikel);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fecthData();
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

      <div className="flex flex-col">
        <div className="container">
          <TitleSection className="ps-10 pt-5">
            Kegiatan akan datang
          </TitleSection>
        </div>
        <div className="scrollbar flex gap-5 overflow-x-auto p-12">
          {loading ? (
            <div className="mx-auto">
              <Loading />
            </div>
          ) : (
            kegiatan
              .slice(0, 6)
              .map((item) => (
                <CardKegiatan
                  to={`/kegiatan/${item.id}`}
                  key={item.id}
                  title={item.title}
                  className="flex-shrink-0 md:touch-pan-x"
                />
              ))
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {loading ? (
          <div className="mx-auto">
            <Loading />
          </div>
        ) : (
          <>
            <div className="container mx-auto">
              <TitleSection className="py-5 ps-10">
                Kegiatan sebelumnya
              </TitleSection>
            </div>
            <div className="flex flex-wrap justify-center gap-5 p-12">
              {kegiatan.length > 0 &&
                kegiatan.map((item) => (
                  <CardArtikel
                    to={`/kegiatan/${item.id}`}
                    key={item.id}
                    title={item.title}
                  >
                    {item.description}
                  </CardArtikel>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
