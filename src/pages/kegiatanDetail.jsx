import { useParams } from "react-router-dom";
import { getAllArticles, getArticle } from "../services/artikel.service";
import TitleSection from "../components/Elements/TitleSection";
import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading/Loading";
import { Detail } from "../components/Fragments/Detail/Detail";
import CardArtikel from "../components/Fragments/Cards/HomeCardArtikel";
import CardKegiatan from "../components/Fragments/Cards/HomeCardKegiatan";

export default function KegiatanDetail() {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState({});
  const [otherKegiatan, setOtherKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const kegiatanData = await getArticle(id);
      setKegiatan(kegiatanData);
      const otherKegiatanData = await getAllArticles();
      setOtherKegiatan(otherKegiatanData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div className="container mx-auto mt-[70px] flex flex-wrap items-center justify-center p-5 lg:items-start lg:justify-start">
        <div className="lg:w-8/12">
          {loading ? (
            <Loading />
          ) : (
            Object.keys(artikel).length > 0 && (
              <>
                <Detail
                  date="20,0202"
                  title={artikel.title}
                  img={artikel.image}
                  desc={artikel.description}
                />
              </>
            )
          )}
        </div>

        <div className="my-20 flex flex-col lg:my-0 lg:w-4/12">
          <h3 className="mx-auto my-5 text-xl font-bold lg:mx-0">
            Kegiatan lainnya
          </h3>
          <div className="flex w-full flex-wrap gap-3">
            {otherKegiatan.length > 0 &&
              otherKegiatan
                .filter((item) => item.id !== +id)
                .slice(0, 3)
                .map((item) => (
                  <>
                    <CardKegiatan
                      to={`/kegiatan/${item.id}`}
                      key={item.id}
                      title={item.title}
                      className="lg:hidden"
                    >
                      {item.description}
                    </CardKegiatan>

                    <div className="hidden lg:block">
                      <CardArtikel
                        to={`/kegiatan/${item.id}`}
                        key={item.id}
                        title={item.title}
                      >
                        {item.description}
                      </CardArtikel>
                    </div>
                  </>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
