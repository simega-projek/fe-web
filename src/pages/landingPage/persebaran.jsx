import Aos from "aos";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Loading from "../../components/Elements/Loading/Loading";
import CardSitus from "../../components/Fragments/Cards/CardSitus";
import { Maps } from "../../components/Fragments/Maps";
import { PaginationPage } from "../../components/Fragments/Paginator/PaginationPage";
import { getAllObject } from "../../services/object.service";
import { toView } from "../../utils/toView";
import { FilterObject } from "../dashboard/managePublication/FilterPublication";
import { useSelector } from "react-redux";

export default function PersebaranPage() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObjects, setDataObjects] = useState([]);
  const [dataPage, setDataPage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const CONTENT_PER_PAGE = 8;

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");

  const isNavbar = useSelector((state) => state.sidebar.navbar);

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
      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt),
      );
      setDataObjects(sortedData);
      setDataPage(objects.pagination);
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

  return (
    <>
      <div className="mt-20">
        <Maps dataObject={dataObjects} path={`/objek`} />
      </div>

      <div className="mt-5 flex w-full justify-center px-10">
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
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-2 justify-items-center gap-2 px-10 py-5 md:grid-cols-3 lg:grid-cols-4"
            data-aos="fade-up"
          >
            {dataObjects?.length > 0
              ? dataObjects?.map((o) => (
                  <CardSitus
                    key={o?.ID}
                    title={o?.nama_objek}
                    desc={o?.propinsi}
                    to={`/objek/${o?.ID}/${o?.nama_objek}`}
                    img={o?.gambar}
                    category={o?.category.category}
                    publish={o?.publish}
                  />
                ))
              : !isLoading && (
                  <div className="col-span-2 text-center text-red-500 md:col-span-3 lg:col-span-4">
                    data {search} tidak ditemukan
                  </div>
                )}
          </div>
        )}
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
    </>
  );
}
