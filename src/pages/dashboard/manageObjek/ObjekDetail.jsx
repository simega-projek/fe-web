import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toView } from "../../../utils/toView";
import { getAllObject, getOneObject } from "../../../services/object.service";
import Loading from "../../../components/Elements/Loading/Loading";
import { Detail } from "../../../components/Fragments/Detail/Detail";
import { SkletonDetailPage } from "../../../components/Fragments/Skleton/SkletonDetailPage";

export default function ObjekDetail() {
  const { id } = useParams();
  const [megalith, setMegalith] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getOneObject(id);

      setMegalith(objects.data);
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

  console.log(megalith);

  // console.log(megalith);

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row md:px-5">
        <div className="w-full">
          {isLoading ? (
            <SkletonDetailPage />
          ) : (
            // <Loading />
            Object.keys(megalith).length > 0 && (
              <Detail
                date={megalith?.CreatedAt}
                title={megalith?.nama_objek}
                img={megalith?.gambar}
                desc={megalith?.deskripsi}
                lintang={megalith?.lintang}
                bujur={megalith?.bujur}
                category={megalith?.category?.category}
                site={megalith?.site?.nama_megalith}
                valley={megalith?.site?.lembah?.lembah}
                status={megalith?.publish}
                detailList={true}
                classImage={"w-2/3"}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
