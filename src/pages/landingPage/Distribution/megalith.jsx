import Aos from "aos";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import CardSitus from "../../../components/Fragments/Cards/CardSitus";
import { FilterObject } from "../../../components/Fragments/Filter/FilterObjek";
import { Maps } from "../../../components/Fragments/Maps";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import SkletonCardSitus from "../../../components/Fragments/Skleton/SkletonCardSitus";
import { getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";

export default function MegalithPage() {
  const location = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [dataObjects, setDataObjects] = useState([]);
  const [dataPage, setDataPage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 10;

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    Aos.init({
      duration: 700,
      once: false,
    });
  }, []);

  const fetchObjects = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(
        CONTENT_PER_PAGE,
        debouncedSearch,
        currentPage,
        valley,
        site,
        category,
        "public",
      );

      setDataObjects(objects?.data);
      setDataPage(objects?.pagination);
      // console.log(dataObjects);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleResetFilter = () => {
    setSearch("");
    setValley("");
    setSite("");
    setCategory("");
  };

  useEffect(() => {
    fetchObjects();
  }, [debouncedSearch, currentPage, valley, site, category]);

  useEffect(() => {
    toView("top");
  }, [pathname]);

  // console.log({ location });
  // console.log({ pathname });

  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <Maps dataObject={dataObjects} path={`/objek`} />
      </div>

      <div className="mt-5 flex w-full justify-center px-5">
        <FilterObject
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
          valley={valley}
          onValley={(e) => setValley(e.target.value)}
          site={site}
          onSite={(e) => setSite(e.target.value)}
          category={category}
          onCategory={(e) => setCategory(e.target.value)}
          onReset={handleResetFilter}
        />
      </div>

      <div className="mt-5">
        <div
          className="grid grid-cols-2 justify-items-center gap-2 px-5 py-5 md:grid-cols-3 lg:grid-cols-5"
          data-aos="fade-up"
        >
          {isLoading ? (
            <SkletonCardSitus count={5} />
          ) : dataObjects?.length > 0 ? (
            dataObjects?.map((o) => (
              <CardSitus
                key={o?.ID}
                title={o?.nama_objek}
                desc={o?.propinsi}
                to={`/objek/${o?.ID}/${o?.nama_objek}`}
                img={o?.gambar}
                category={o?.category?.category}
                publish={o?.publish}
              />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-2 text-center text-red-500 md:col-span-3 lg:col-span-5">
                data {search} tidak ditemukan
              </div>
            )
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mb-5 flex flex-col items-center justify-center">
        {isLoading ? null : (
          <PaginationPage
            currentPage={currentPage}
            totalPages={dataPage?.totalPages}
            onPageChange={onPageChange}
            totalItems={dataPage?.totalItems}
          />
        )}
      </div>
    </div>
  );
}
