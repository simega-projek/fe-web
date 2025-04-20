import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../../../components/Fragments/Detail/Detail";
import { SkletonDetailPage } from "../../../components/Fragments/Skleton/SkletonDetailPage";
import { getOneArticle } from "../../../services/article.service";
import { toView } from "../../../utils/toView";

export default function DetailArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getOneArticle(id);

      setArticle(objects.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObject();
    toView("top");
  }, [id]);

  console.log(article);

  return (
    <>
      <div className="mb-10 flex h-full flex-col md:flex-row md:px-5">
        <div className="w-full">
          {isLoading ? (
            <SkletonDetailPage />
          ) : (
            // <Loading />
            Object.keys(article).length > 0 && (
              <Detail
                date={article?.CreatedAt}
                title={article?.title}
                img={article?.image}
                desc={article?.description}
                file={article?.file}
                classImage={"w-2/3"}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
