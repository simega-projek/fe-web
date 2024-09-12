import { useEffect, useState } from "react";
import { Detail } from "../../components/Fragments/Detail/Detail";
import { getOneArticle } from "../../services/article.service";
import { useParams } from "react-router-dom";
import Loading from "../../components/Elements/Loading/Loading";
import { formatDate } from "../../utils/formatDate";
export default function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fecthData = async () => {
      try {
        const articleDetail = await getOneArticle(id);
        setArticle(articleDetail.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [id]);

  console.log({ article });

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
