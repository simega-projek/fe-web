import { useEffect, useState } from "react";
import { Detail } from "../../components/Fragments/Detail/Detail";
import { getOneArticle } from "../../services/article.service";
import { useParams } from "react-router-dom";
import Loading from "../../components/Elements/Loading/Loading";
import { formatDate } from "../../utils/formatDate";
import { toView } from "../../utils/toView";
export default function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const articleDetail = await getOneArticle(id);
      setArticle(articleDetail.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
    toView("top");
  }, [id]);

  // console.log({ article });

  // if (loading) return (<Loading />);
  return (
    <>
      <div className="container mx-auto mt-[70px] flex flex-wrap items-center justify-center p-5 lg:items-start lg:justify-start">
        {Object.keys(article).length > 0 && (
          <Detail
            date={formatDate(article?.CreatedAt)}
            title={article?.title}
            desc={article?.description}
            img={article?.image}
          />
        )}
      </div>
    </>
  );
}
