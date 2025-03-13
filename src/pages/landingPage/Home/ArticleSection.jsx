import React, { useEffect, useState } from "react";
import ButtonLink from "../../../components/Elements/Buttons/ButtonLink";
import TitleSection from "../../../components/Elements/TitleSection";
import { CardBlog } from "../../../components/Fragments/Cards/CardBlog";
import { getAllArticles } from "../../../services/article.service";
import Aos from "aos";

export const ArticleSection = () => {
  const [dataArticles, setDataArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchDataApi = async () => {
    setIsLoading(true);
    try {
      const articles = await getAllArticles(4);
      setDataArticles(articles.data);
      // console.log(articles.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  //   console.log(dataArticles);

  useEffect(() => {
    fetchDataApi();
  }, []);
  return (
    <section
      id="artikel"
      className="bg-light bg-[url('/images/bg2.svg')] bg-no-repeat px-5 py-20"
    >
      <div
        className="mb-10 flex w-full items-center gap-5 px-5 md:px-10"
        data-aos="slide-left"
      >
        <TitleSection>Artikel & Berita</TitleSection>
        <span className="h-px flex-1 bg-primary"></span>
      </div>

      <div
        className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 md:px-5 lg:gap-5 lg:px-10"
        data-aos="fade-left"
      >
        {dataArticles?.map((article) => (
          <CardBlog
            key={article?.ID}
            to={`/artikel/${article?.ID}/${article?.title}`}
            img={article?.image}
            title={article?.title}
            date={article?.CreatedAt}
            desc={article?.description}
          />
        ))}
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

const SkletonCard = () => {
  return (
    <section className="w-1/4 animate-pulse bg-transparent">
      <div className="w-full">
        <div className="h-64 w-full rounded-lg bg-white/45 md:h-72"></div>

        <h1 className="mt-4 h-2 w-56 rounded-lg bg-white/45"></h1>
        <p className="mt-4 h-2 w-24 rounded-lg bg-white/45"></p>
      </div>
    </section>
  );
};
