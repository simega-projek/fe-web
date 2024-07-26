import { useEffect, useState } from "react";
import { Detail } from "../../components/Fragments/Detail/Detail";
import { getArticle } from "../../services/artikel.service";
import { useParams } from "react-router-dom";
import Loading from "../../components/Elements/Loading/Loading";
export default function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fecthData = async () => {
      try {
        const articleDetail = await getArticle(id);
        setArticle(articleDetail);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [id]);

  // if (loading) return (<Loading />);
  return (
    <>
      <div className="container mx-auto mt-[70px] flex flex-wrap items-center justify-center p-5 lg:items-start lg:justify-start">
        {Object.keys(article).length > 0 && (
          <Detail
            date="202020"
            title={article.title}
            desc={article.description}
            img={article.image}
          />
        )}
      </div>
    </>
  );
}