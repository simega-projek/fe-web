import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toView } from "../../../utils/toView";
import { getAllObject, getOneObject } from "../../../services/object.service";
import Loading from "../../../components/Elements/Loading/Loading";
import { Detail } from "../../../components/Fragments/Detail/Detail";

export default function ObjekDetail() {
  const { id } = useParams();
  const [situs, setSitus] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getOneObject(id);

      setSitus(objects.data);
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

  // console.log(situs);

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row md:px-5">
        <div className="mb-10 w-full px-10">
          {isLoading ? (
            <Loading />
          ) : (
            Object.keys(situs).length > 0 && (
              <Detail
                date={situs?.CreatedAt}
                title={situs?.nama_objek}
                img={situs?.gambar}
                desc={situs?.deskripsi}
                lintang={situs?.lintang}
                bujur={situs?.bujur}
                category={situs?.category?.category}
                site={situs?.site?.nama_situs}
                valley={situs?.site?.lembah?.lembah}
                status={situs?.publish}
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
