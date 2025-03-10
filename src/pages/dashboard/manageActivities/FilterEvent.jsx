import { Select, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

export const FilterEvent = ({ search, onSearch, status, onStatus }) => {
  return (
    <div className="flex w-full flex-col gap-2 md:w-3/4 md:flex-row lg:w-1/2">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-full"
      />
      <Select
        value={status}
        onChange={onStatus}
        className="w-full md:w-1/2 lg:w-1/3"
      >
        <option value={""} className="bg-light">
          Status
        </option>
        <option value={"Akan Datang"}>Akan Datang</option>
        <option value={"Proses"}>Sedang Berlangsung</option>
        <option value={"Selesai"}>Selesai</option>
      </Select>
    </div>
  );
};

// paste on component root

{
  /* <FilterEvent
            search={searchData}
            onSearch={(e) => setSearchData(e.target.value)}
            status={status}
            onStatus={(e) => setStatus(e.target.value)}
          />
          */
}

//             // search and filter
//   const [searchData, setSearchData] = useState("");
//   const [status, setStatus] = useState("");
//   const [debouncedSearch] = useDebounce(searchData, 1000);
