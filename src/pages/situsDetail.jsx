import { useParams } from "react-router-dom";
import { getArticle, getTechCrunch } from "../services/artikel.service";
import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading/Loading";
import { Detail } from "../components/Fragments/Detail/Detail";
import videosData from "../data/videos.json";
import TitleSection from "../components/Elements/TitleSection";

export default function SitusDetail() {
  const { id } = useParams();
  const [situs, setSitus] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const situsData = await getArticle(1);
      setSitus(situsData);
      const imageData = await getTechCrunch();
      setImages(imageData);
      setVideos(videosData.videos);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto mt-[70px] flex flex-wrap items-center justify-center p-5 lg:items-start lg:justify-start">
        <div className="lg:w-10/12">
          {loading ? (
            <Loading />
          ) : (
            <Detail
              date="20,0202"
              title={situs.title}
              img={situs.image}
              desc={situs.description}
            />
          )}
        </div>
      </div>

      <TitleSection className="p-3">Gambar</TitleSection>
      <div className="flex justify-center gap-5 overflow-x-scroll px-5">
        {images.map((i) => (
          <div className="aspect-video w-80 flex-shrink-0" key={i.source.id}>
            <img
              src={i.urlToImage}
              alt={i.title}
              className="h-full w-full max-w-none object-cover"
            />
          </div>
        ))}
        {images.length === 0 && (
          <div className="w-60 flex-shrink-0 text-red-500">
            Tidak Ada gambar
          </div>
        )}
      </div>

      <TitleSection className="p-5">Video</TitleSection>
      <div className="flex justify-center gap-5 overflow-x-scroll px-5">
        {videos.map((v) => (
          <div className="w-60 flex-shrink-0" key={v.id}>
            <iframe
              iframe
              width="420"
              height="345"
              src={v.videos}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
        {images.length === 0 && (
          <div className="w-60 flex-shrink-0 text-red-500">Tidak Ada video</div>
        )}
      </div>
    </>
  );
}
