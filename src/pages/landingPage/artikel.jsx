import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllArticles } from "../../services/article.service";
import { TextInput } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ArtikelPage() {
  const [dataArticles, setDataArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const articles = await getAllArticles(50, debouncedSearch);
      setDataArticles(articles.data);
      console.log(articles.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [debouncedSearch]);
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

      <div className="mx-auto mt-5 w-full px-5 lg:w-1/2">
        <TextInput
          icon={FaSearch}
          placeholder="Cari Artikel & berita..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div
          className="my-12 flex flex-wrap justify-center gap-5 px-10 md:justify-evenly md:px-0 lg:justify-center"
          data-aos="zoom-in"
        >
          {dataArticles?.length > 0 &&
            dataArticles?.map((article) => (
              <>
                <CardArtikel
                  key={article?.ID}
                  title={article?.title}
                  to={`/artikel/${article?.ID}/${article?.title}`}
                  date={article?.CreatedAt}
                  source={article?.users?.fullname}
                />
              </>
            ))}
        </div>
      )}
    </>
  );
}
