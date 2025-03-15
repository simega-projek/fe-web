import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllObject, getOneObject } from "../../../services/object.service";
import Loading from "../../../components/Elements/Loading/Loading";
import { Detail } from "../../../components/Fragments/Detail/Detail";
import { OtherPosts } from "../../../components/Fragments/Detail/OtherPosts";

export default function MegalithDetail() {
  const { id } = useParams();
  const [situs, setSitus] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [otherObjects, setOtherObjects] = useState([]);

  const LIMIT_OTHER_EVENT = 5;
  const pagesEvent = useSelector((state) => state.pages.page);
  const { totalPages } = pagesEvent;

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getOneObject(id);
      // console.log(objects.data);

      const randomPage = generateRandomNumber(1, totalPages + 1);

      let other = await getAllObject(
        LIMIT_OTHER_EVENT,
        "",
        randomPage,
        "",
        "",
        "",
        "public",
      );
      setSitus(objects.data);
      setOtherObjects(other);
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
      <div className="mb-10 mt-32 flex flex-col md:flex-row md:px-5">
        <div className="mb-10 px-10 md:w-8/12">
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
              />
            )
          )}
        </div>

        <div className="flex w-full flex-col gap-3 break-words px-5 md:w-4/12">
          <p className="mt-0.5 text-lg font-medium text-gray-900">
            Objek Lainnya
          </p>
          {otherObjects?.data?.map((o) => (
            <OtherPosts
              key={o?.ID}
              title={o?.nama_objek}
              desc={o?.deskripsi}
              to={`/objek/${o?.ID}/${o?.nama_objek}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
