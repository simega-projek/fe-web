import { useParams } from "react-router-dom";
import { getAllArticles, getOneArticle } from "../../services/article.service";
import TitleSection from "../../components/Elements/TitleSection";
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading/Loading";
import { Detail } from "../../components/Fragments/Detail/Detail";
import CardArtikel from "../../components/Fragments/Cards/HomeCardArtikel";
import CardKegiatan from "../../components/Fragments/Cards/HomeCardKegiatan";
import { getAllEvent, getOneEvent } from "../../services/event.service";
import { formatDate } from "../../utils/formatDate";

export default function KegiatanDetail() {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState({});
  const [otherKegiatan, setOtherKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const kegiatanData = await getOneEvent(id);
      // console.log(kegiatanData.data);
      setKegiatan(kegiatanData.data);
      const otherKegiatanData = await getAllEvent();
      // console.log(otherKegiatanData);
      setOtherKegiatan(otherKegiatanData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
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
            Object.keys(kegiatan).length > 0 && (
              <>
                <Detail
                  date={formatDate(kegiatan?.CreatedAt)}
                  title={kegiatan?.title}
                  img={kegiatan?.image}
                  desc={kegiatan?.description}
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
            {otherKegiatan?.length > 0 &&
              shuffleArray(otherKegiatan)
                ?.filter((item) => item?.ID !== +id)
                .slice(0, 3)
                .map((item) => (
                  <>
                    <CardKegiatan
                      to={`/kegiatan/${item?.ID}/${item?.title}`}
                      key={item?.ID}
                      title={item?.title}
                      className="lg:hidden"
                    >
                      {item?.description}
                    </CardKegiatan>

                    <div className="hidden lg:block">
                      <CardArtikel
                        to={`/kegiatan/${item?.ID}/${item?.title}`}
                        key={item?.ID}
                        title={item?.title}
                      >
                        {item?.description}
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
