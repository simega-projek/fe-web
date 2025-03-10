import { Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSearch, FaUndoAlt } from "react-icons/fa";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { getAllCategory } from "../../../services/category.service";
import { getAllSite } from "../../../services/site.service";
import { getAllValley } from "../../../services/valley.service";

export const FilterObject = ({
  search,
  onSearch,
  site,
  onSite,
  publish,
  onPublish,
  valley,
  onValley,
  category,
  onCategory,
  onReset,
  filterSite,
}) => {
  const [valleyData, setValleyData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [siteFilter, setSiteFilter] = useState([]);

  const [showFilters, setshowFilters] = useState(false);
  const fetchDataFilter = async () => {
    try {
      const valley = await getAllValley();
      const site = await getAllSite();
      const category = await getAllCategory();

      const sortValley = valley.data.sort((a, b) => {
        return a.lembah.localeCompare(b.lembah);
      });

      const sortSite = site.data.sort((a, b) => {
        return a.nama_situs.localeCompare(b.nama_situs);
      });
      const sortCategory = category.data.sort((a, b) => {
        return a.category.localeCompare(b.category);
      });

      setValleyData(sortValley);
      setSiteData(sortSite);
      setCategoryData(sortCategory);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataFilter();
  }, []);

  // const selectedLembahId = filterSite;
  // if (filterSite) {
  //   const filtered = siteData.filter((s) => s.lembah_id == selectedLembahId);
  //   console.log(filtered);
  // } else return;
  // console.log(siteDataa);

  return (
    <div className="flex w-full flex-col gap-2 md:w-3/4 lg:flex-row">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-full lg:w-1/3"
      />

      {/* Toggle Filter Button for Mobile */}
      <button
        className="rounded bg-gray-200 p-2 md:hidden"
        onClick={() => setshowFilters(!showFilters)}
      >
        {showFilters ? "Tutup Filter" : "Filter"}
      </button>

      {/* Filters Container */}
      <div
        className={`flex flex-col md:flex-row ${showFilters ? "block" : "hidden"} gap-1 md:flex`}
      >
        {/* Publish Filter */}
        <Select
          value={publish}
          onChange={onPublish}
          className="w-full md:w-1/4"
        >
          <option value={""} className="bg-light">
            Publish
          </option>
          <option value={"pending"}>Pending</option>
          <option value={"public"}>Publik</option>
          <option value={"private"}>Privat</option>
        </Select>

        {/* Category Filter */}
        <Select
          value={category}
          onChange={onCategory}
          className="w-full md:w-1/4"
        >
          <option value={""} className="bg-light">
            Kategori
          </option>
          {categoryData.map((c) => (
            <option value={c?.category} key={c?.ID}>
              {c?.category}
            </option>
          ))}
        </Select>

        {/* Lembah Filter */}
        <Select value={valley} onChange={onValley} className="w-full md:w-1/4">
          <option value={""} className="bg-light">
            Lembah
          </option>
          {valleyData.map((d) => (
            <option value={d?.lembah} key={d?.ID}>
              {d?.lembah}
            </option>
          ))}
        </Select>

        {/* Situs Filter */}
        <Select value={site} onChange={onSite} className="w-full md:w-1/4">
          <option value={""} className="bg-light">
            Situs
          </option>
          {siteData.map((s) => (
            <option value={s?.nama_situs} key={s?.ID}>
              {s?.nama_situs}
            </option>
          ))}
        </Select>

        {/* Reset Button */}
        <div className="z-50 flex w-full justify-end md:w-1/12 md:items-center">
          <ButtonControls name={"Reset"} icon={FaUndoAlt} onClick={onReset} />
        </div>
      </div>
    </div>
  );
};

// // paste on root component
// // filter
// const [search, setSearch] = useState("");
// const [debouncedSearch] = useDebounce(search, 1000);
// const [publish, setPublish] = useState("");
// const [valley, setValley] = useState("");
// const [site, setSite] = useState("");
// const [category, setCategory] = useState("");

// const handleResetFilter = () => {
//   setSearch("");
//   setPublish("");
//   setValley("");
//   setSite("");
//   setCategory("");
// };

{
  /* <FilterObject
  search={search}
  onSearch={(e) => setSearch(e.target.value)}
  valley={valley}
  onValley={(e) => setValley(e.target.value)}
  site={site}
  onSite={(e) => setSite(e.target.value)}
  category={category}
  onCategory={(e) => setCategory(e.target.value)}
  publish={publish}
  onPublish={(e) => setPublish(e.target.value)}
  onReset={handleResetFilter}
/>; */
}
