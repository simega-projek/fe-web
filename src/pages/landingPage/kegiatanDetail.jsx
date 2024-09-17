import { useParams } from "react-router-dom";
import { getAllArticles, getOneArticle } from "../../services/article.service";
import TitleSection from "../../components/Elements/TitleSection";
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading/Loading";
import { Detail } from "../../components/Fragments/Detail/Detail";

import { getAllEvent, getOneEvent } from "../../services/event.service";
import { formatDate } from "../../utils/formatDate";
import { CardKegiatanHome } from "../../components/Fragments/Cards/HomeCardKegiatan";
import { CardArtikelHome } from "../../components/Fragments/Cards/HomeCardArtikel";
import { toView } from "../../utils/toView";

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
    toView("top");
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
                  date={formatDate(kegiatan?.start_date)}
                  title={kegiatan?.title}
                  img={kegiatan?.image}
                  desc={kegiatan?.description}
                />
              </>
            )
          )}
        </div>

        {/* <div className="my-20 flex flex-col lg:my-0 lg:w-1/2">
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
                    <CardKegiatanHome
                      to={`/kegiatan/${item?.ID}/${item?.title}`}
                      key={item?.ID}
                      title={item?.title}
                      className="lg:hidden"
                      date={item?.start_date}
                      img={item?.image}
                    />

                    <div className="hidden lg:block">
                      <CardArtikelHome
                        to={`/kegiatan/${item?.ID}/${item?.title}`}
                        key={item?.ID}
                        title={item?.title}
                      >
                        {item?.description}
                      </CardArtikelHome>
                    </div>
                  </>
                ))}
          </div>
        </div> */}
      </div>
    </>
  );
}
