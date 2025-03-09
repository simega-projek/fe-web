import AOS from "aos";
import "aos/dist/aos.css";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import TextBlink from "../../components/Elements/TextBlink/TextBlink";
import CardArtikel from "../../components/Fragments/Cards/CardArtikel";
import { PaginationPage } from "../../components/Fragments/Paginator/PaginationPage";
import { HeroSection } from "../../components/Fragments/Sections/Hero";
import { getAllArticles } from "../../services/article.service";
import { toView } from "../../utils/toView";

export default function ArtikelPage() {
  const [dataArticles, setDataArticles] = useState([]);
  const [dataPage, setDataPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 8;

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getAllArticles(
        CONTENT_PER_PAGE,
        debouncedSearch,
        currentPage,
      );

      console.log(articles);

      const sortedData = articles.data.sort(
        (a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt),
      );

      setDataArticles(sortedData);
      setDataPage(articles?.pagination);
      setCurrentPage(articles?.pagination?.currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };
  useEffect(() => {
    fetchArticles();
  }, [debouncedSearch, currentPage]);

  return (
    <>
      <HeroSection className="h-screen md:h-96">
        <div className="text-center text-white">
          <h2 className="mb-5 max-w-xl text-xl font-semibold md:text-2xl">
            Artikel & Berita
          </h2>
          <TextBlink className={`max-w-sm text-base`}>
            Telaah Artikel menarik di Negeri 1000 Megalit Sulawesi Tengah
          </TextBlink>
        </div>
      </HeroSection>
      <div className="mx-auto mt-5 w-full px-10 md:w-1/2">
        <TextInput
          icon={FaSearch}
          placeholder="Cari Artikel & berita..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-2 justify-items-center gap-5 px-10 py-5 last:flex last:justify-center md:grid-cols-3 lg:grid-cols-4"
            data-aos="zoom-in"
          >
            {Array.isArray(dataArticles) && dataArticles?.length > 0
              ? dataArticles?.map((article) => (
                  <CardArtikel
                    // className="w-1/2"
                    key={article?.ID}
                    title={article?.title}
                    to={`/artikel/${article?.ID}/${article?.title}`}
                    date={article?.CreatedAt}
                    source={article?.users?.fullname}
                    img={article?.image}
                  />
                ))
              : !isLoading && (
                  <p className="my-5 text-red-500">
                    data {search} tidak ditemukan
                  </p>
                )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mb-5 flex flex-col items-center justify-center">
        {isLoading ? null : (
          <PaginationPage
            currentPage={currentPage}
            totalPages={dataPage?.totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
}
