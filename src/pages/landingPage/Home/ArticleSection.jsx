import Aos from "aos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLink from "../../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../../components/Elements/TitleSection";
import { CardBlog } from "../../../components/Fragments/Cards/CardBlog";
import {
  setDataArticle,
  setPageArticle,
} from "../../../redux/slices/articleSlice";
import { getAllArticles } from "../../../services/article.service";

// const CardBlog = lazy(
//   () => import("../../../components/Fragments/Cards/CardBlog"),
// );
export const ArticleSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  // redux
  const articlesData = useSelector((state) => state.articles.data);
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchDataApi = async () => {
    setIsLoading(true);
    try {
      const articles = await getAllArticles(10);
      // console.log(articles);
      // setDataArticles(articles.data);
      dispatch(setDataArticle(articles.data));
      dispatch(setPageArticle(articles.pagination));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(dataArticles);

  useEffect(() => {
    fetchDataApi();
  }, []);

  // console.log(articlesData);
  return (
    <section
      id="artikel"
      className="bg-light bg-[url('/images/bg2.png')] bg-no-repeat px-5 py-20"
    >
      <div
        className="mb-10 flex w-full items-center gap-5 px-5 md:px-10"
        data-aos="fade-right"
      >
        <TitleSection>Artikel & Berita</TitleSection>
        <span className="h-px flex-1 bg-primary"></span>
      </div>

      <div
        className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 md:px-5 lg:gap-5 lg:px-10"
        data-aos="slide-up"
      >
        {isLoading ? (
          <SkletonCardArticle />
        ) : (
          articlesData
            ?.slice(0, 4)
            ?.map((article) => (
              <CardBlog
                key={article?.ID}
                to={`/artikel/${article?.ID}/${article?.title}`}
                img={article?.image}
                title={article?.title}
                date={article?.CreatedAt}
                desc={article?.description}
              />
            ))
        )}
      </div>

      <div className="mt-10 flex w-full justify-end md:px-5">
        <ButtonLink
          to={`/artikel`}
          className={`w-fit rounded-none border-[3px] border-primary bg-primary text-sm font-bold text-white transition-all duration-300 hover:bg-light hover:text-primary md:text-lg`}
        >
          Lihat Artikel & Berita Lainnya
        </ButtonLink>
      </div>
    </section>
  );
};

const SkletonCardArticle = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex bg-gray-200 transition">
          <div className="hidden sm:block sm:basis-56">
            <div className="aspect-square h-full w-full animate-pulse bg-gray-100 object-cover" />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex animate-pulse flex-col gap-5 border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <h3 className="h-5 w-full rounded-full bg-gray-100"> </h3>
              <h3 className="h-5 w-4/5 rounded-full bg-gray-100"> </h3>
              <h3 className="h-5 w-3/5 rounded-full bg-gray-100"> </h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
