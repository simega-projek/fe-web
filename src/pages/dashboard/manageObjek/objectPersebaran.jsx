import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CardSitus from "../../../components/Fragments/Cards/CardSitus";
import { FilterObject } from "../../../components/Fragments/Filter/FilterObjek";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { Maps } from "../../../components/Fragments/Maps";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import SkletonCardSitus from "../../../components/Fragments/Skleton/SkletonCardSitus";
import { getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";

export default function ObjectPersebaran() {
  const lokasi = [-0.9949962515054261, 121.40497407083464];
  const [isLoading, setIsLoading] = useState(true);

  const [dataObjects, setDataObjects] = useState([]);

  const [dataPage, setDataPage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(12);

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [publish, setPublish] = useState("");
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [filterSite, setFilterSite] = useState(null);
  const [category, setCategory] = useState("");

  const fetchObjects = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(
        contentPage,
        debouncedSearch,
        currentPage,
        valley,
        site,
        category,
        publish,
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

  const handleResetFilter = () => {
    setSearch("");
    setPublish("");
    setValley("");
    setSite("");
    setCategory("");
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleValley = (e) => {
    const value = e.target.value; // Get the selected value
    const selectedIndex = e.target.selectedIndex; // Get the index of the selected option
    const title = e.target.options[selectedIndex].title;
    setValley(value);
    setFilterSite(title);
  };
  useEffect(() => {
    fetchObjects();
  }, [
    debouncedSearch,
    currentPage,
    contentPage,
    publish,
    valley,
    site,
    category,
  ]);

  // console.log(dataObjects);

  return (
    <>
      <div>
        <Maps dataObject={dataObjects} path={`/admin/detail-objek`} />
      </div>

      <div className="mt-5 flex w-full justify-between">
        <FilterObject
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
          valley={valley}
          onValley={handleValley}
          site={site}
          onSite={(e) => setSite(e.target.value)}
          category={category}
          onCategory={(e) => setCategory(e.target.value)}
          publish={publish}
          onPublish={(e) => setPublish(e.target.value)}
          onReset={handleResetFilter}
          filterSite={filterSite}
          viewPublish={true}
        />

        <FilterPage
          className={"ml-1 w-1/2 md:w-fit"}
          onChange={(e) => setContentPage(e.target.value)}
          value={contentPage}
        />
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-2 justify-items-center gap-2 py-5 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <SkletonCardSitus count={4} />
          ) : dataObjects?.length > 0 ? (
            dataObjects?.map((o) => (
              <CardSitus
                key={o?.ID}
                title={o?.nama_objek}
                desc={o?.propinsi}
                to={`/admin/detail-objek/${o?.ID}/${o?.nama_objek}`}
                img={o?.gambar}
                category={o?.category.category}
                publish={o?.publish}
              />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-2 text-red-500 md:col-span-3 lg:col-span-4">
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
    </>
  );
}
