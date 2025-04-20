import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../../../components/Fragments/Detail/Detail";

import { useSelector } from "react-redux";
import { OtherPosts } from "../../../components/Fragments/Detail/OtherPosts";
import { SkletonDetailPage } from "../../../components/Fragments/Skleton/SkletonDetailPage";
import {
  getAllArticles,
  getOneArticle,
} from "../../../services/article.service";
import { toView } from "../../../utils/toView";
export default function ArtikelDetail() {
  const { id, slug } = useParams();
  const [article, setArticle] = useState([]);
  const [otherArticle, setOtherArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // redux
  const pagesArticle = useSelector((state) => state.pages.page);
  const { totalPages } = pagesArticle;

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const articleDetail = await getOneArticle(id);

      const randomPage = generateRandomNumber(1, totalPages + 1);
      // console.log(randomPage);
      let other = await getAllArticles(5, "", randomPage);
      if (!other.data || other.data.length === 0) {
        other = await getAllArticles(5, "", 1);
      }

      setArticle(articleDetail.data);
      setOtherArticle(other.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
    toView("top");
  }, [id]);

  // console.log({ article });
  return (
    <>
      <div className="mb-10 mt-32 flex flex-col md:flex-row md:px-5">
        <div className="mb-10 px-5 md:w-8/12">
          {isLoading ? (
            <SkletonDetailPage />
          ) : (
            Object.keys(article).length > 0 && (
              <Detail
                file={article?.file}
                date={article?.CreatedAt}
                title={article?.title}
                desc={article?.description}
                img={article?.image}
              />
            )
          )}
          <hr />
        </div>

        <div className="flex w-full flex-col gap-3 break-words px-5 md:w-4/12">
          <p className="mt-0.5 text-lg font-medium text-gray-900">
            Artikel Lainnya
          </p>
          {otherArticle?.map((o) => (
            <OtherPosts
              key={o?.ID}
              title={o?.title}
              desc={o?.description}
              to={`/artikel/${o?.ID}/${o?.title}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
