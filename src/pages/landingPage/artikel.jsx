import { useEffect, useState } from "react";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllArticles } from "../../services/article.service";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import CardArtikelHome from "../../components/Fragments/Cards/HomeCardArtikel";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let fecthData = async () => {
      try {
        const dataArticle = await getAllArticles();
        setArticles(dataArticle);
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
            Artikel & Berita
          </h2>
          <TextBlink className={`max-w-sm text-base`}>
            Telaah Artikel menarik di Negeri 1000 Megalit Sulawesi Tengah
          </TextBlink>
        </div>
      </HeroSection>

      {loading ? (
        <Loading />
      ) : (
        <div className="my-12 flex flex-wrap justify-center gap-5 px-10 md:justify-evenly md:px-0 lg:justify-center">
          {articles?.length > 0 &&
            articles?.map((article) => (
              <>
                <CardArtikel
                  key={article.id}
                  title={article.title}
                  to={`/artikel/${article.id}`}
                />
              </>
            ))}
        </div>
      )}
    </>
  );
}
