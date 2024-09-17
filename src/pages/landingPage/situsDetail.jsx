import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { getOneArticle, getTechCrunch } from "../../services/article.service";
import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading/Loading";
import { Detail } from "../../components/Fragments/Detail/Detail";
import videosData from "../../data/videos.json";
import TitleSection from "../../components/Elements/TitleSection";
import { getOneObject } from "../../services/object.service";
import { toView } from "../../utils/toView";

export default function SitusDetail() {
  const { id } = useParams();
  const [situs, setSitus] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  const fetchObject = async () => {
    setLoading(true);
    try {
      const objects = await getOneObject(id);
      setSitus(objects.data);
      const imageData = await getTechCrunch();
      setImages(imageData);

      setVideos(videosData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObject();
    toView("top");
  }, [id]);

  // const handleOpenImage = (index) => {
  //   setIndexImage(index);
  //   setOpenImage(true);
  // };

  // const handleCloseImage = () => {
  //   setOpenImage(false);
  // };

  // const handleNextImage = () => {
  //   setIndexImage((prevIndex) => (prevIndex + 1) % images.length);
  // };

  // const handlePrevImage = () => {
  //   setIndexImage(
  //     (prevIndex) => (prevIndex - 1 + images.length) % images.length,
  //   );
  // };

  return (
    <>
      <div className="container mx-auto mt-[70px] flex flex-wrap items-center justify-center p-5 lg:items-start lg:justify-start">
        <div className="lg:w-10/12">
          {loading ? (
            <Loading />
          ) : (
            <Detail
              date={situs?.CreatedAt}
              title={situs.nama_objek}
              img={situs.gambar}
              desc={situs.deskripsi}
            />
          )}
        </div>
      </div>

      {/* <TitleSection className="p-5">Gambar</TitleSection>
      <div className="scrollbar overflow-x-scroll">
        <div className="flex gap-5">
          {images.map((i, index) => (
            <img
              src={i.urlToImage}
              alt={i.title}
              key={index}
              className="max-w-xs cursor-pointer object-cover"
              onClick={() => handleOpenImage(index)}
            />
          ))}
          {images.length === 0 && (
            <div className="w-full text-center text-red-500">
              Tidak Ada gambar
            </div>
          )}
        </div>
      </div>

      {openImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 pt-20">
          <button
            className={`absolute right-5 top-20 flex items-center justify-center rounded-full bg-white/70 px-4 py-2 text-2xl text-white`}
            onClick={() => handleCloseImage()}
          >
            &times;
          </button>
          <button
            className="absolute left-5 flex items-center justify-center rounded-full bg-white/70 px-3 py-2 text-2xl hover:text-white"
            onClick={() => handlePrevImage()}
          >
            &larr;
          </button>
          <img
            src={images[indexImage].urlToImage}
            className={`max-h-full max-w-full object-cover py-5`}
          />
          <button
            className="absolute right-5 flex items-center justify-center rounded-full bg-white/70 px-3 py-2 text-2xl hover:text-white"
            onClick={() => handleNextImage()}
          >
            &rarr;
          </button>
        </div>
      )}

      <TitleSection className="p-5">Video</TitleSection>
      <div className="flex flex-wrap justify-center gap-5 px-5 pb-5">
        {videos.slice(0, 3).map((v) => (
          <ReactPlayer url={v.url} key={v.id} controls={true} />
        ))}
        {videos.length === 0 && (
          <div className="w-full text-center text-red-500">Tidak Ada video</div>
        )}
      </div> */}
    </>
  );
}
