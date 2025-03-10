import { TextInput } from "flowbite-react";
import { FaSearch, FaUndoAlt } from "react-icons/fa";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { useState } from "react";

export const FilterFeedback = ({
  search,
  onSearch,
  date,
  onDate,
  month,
  onMonth,
  year,
  onYear,
  onReset,
  isLoading,
}) => {
  const days = dayDate();

  const [showFilters, setShowFilters] = useState(false);

  return (
    // <div className="flex w-full flex-wrap gap-3 md:w-2/3 md:flex-nowrap md:justify-center">
    //   {/* search */}
    //   <div className="w-full md:w-1/2">
    //     <TextInput
    //       value={search}
    //       onChange={onSearch}
    //       disabled={isLoading}
    //       icon={FaSearch}
    //       placeholder="Cari berdasarkan nama..."
    //     />
    //   </div>

    //   {/* tanggal */}
    //   <div className="w-full md:w-1/6">
    //     <select
    //       id="date"
    //       className="w-full rounded-md"
    //       onChange={onDate}
    //       disabled={isLoading}
    //       value={date}
    //     >
    //       <option className="bg-light" value={""}>
    //         Tanggal
    //       </option>
    //       {days.map((d) => (
    //         <option key={d} value={d}>
    //           {d}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   {/* bulan */}
    //   <div className="w-full md:w-1/6">
    //     <select
    //       id="month"
    //       className="w-full rounded-md"
    //       onChange={onMonth}
    //       disabled={isLoading}
    //       value={month}
    //     >
    //       <option className="bg-light" value={""}>
    //         Bulan
    //       </option>
    //       {months?.map((month) => (
    //         <option key={month.id} value={month.id}>
    //           {month.month}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   {/* tahun */}
    //   <div className="w-full md:w-1/6">
    //     <TextInput
    //       id="year"
    //       type="number"
    //       placeholder="Tahun"
    //       value={year}
    //       onChange={onYear}
    //       disabled={isLoading}
    //     />
    //   </div>

    //   {/* reset */}
    //   <ButtonControls name={"Reset"} icon={FaUndoAlt} onClick={onReset} />
    // </div>
    <div className="flex w-full flex-col gap-3 md:flex-row">
      {/* Search */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <TextInput
          value={search}
          onChange={onSearch}
          disabled={isLoading}
          icon={FaSearch}
          placeholder="Cari berdasarkan nama..."
        />
      </div>

      {/* Mobile Toggle Button */}

      <button
        className="rounded bg-gray-200 p-2 md:hidden"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Tutup Filter" : "Filter"}
      </button>

      {/* Filter Options */}
      <div
        className={`flex flex-wrap gap-3 ${showFilters ? "block" : "hidden"} md:flex md:gap-3`}
      >
        {/* Tanggal */}
        <div className="w-full md:w-1/3 lg:w-1/5">
          <select
            id="date"
            className="w-full rounded-md"
            onChange={onDate}
            disabled={isLoading}
            value={date}
          >
            <option className="bg-light" value="">
              Tanggal
            </option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Bulan */}
        <div className="w-full md:w-1/3 lg:w-1/5">
          <select
            id="month"
            className="w-full rounded-md"
            onChange={onMonth}
            disabled={isLoading}
            value={month}
          >
            <option className="bg-light" value="">
              Bulan
            </option>
            {months?.map((month) => (
              <option key={month.id} value={month.id}>
                {month.month}
              </option>
            ))}
          </select>
        </div>

        {/* Tahun */}
        <div className="w-full md:w-1/3 lg:w-1/5">
          <TextInput
            id="year"
            type="number"
            placeholder="Tahun"
            value={year}
            onChange={onYear}
            disabled={isLoading}
          />
        </div>

        {/* Reset Button */}
        <div className="z-50 flex w-full justify-end md:w-1/12 md:items-center">
          <ButtonControls name={"Reset"} icon={FaUndoAlt} onClick={onReset} />
        </div>
      </div>
    </div>
  );
};

const dayDate = () => {
  const day = [];
  for (let i = 1; i <= 31; i++) {
    day.push(i);
  }

  return day;
};
const months = [
  {
    id: 1,
    month: "Januari",
  },
  {
    id: 2,
    month: "Februari",
  },
  {
    id: 3,
    month: "Maret",
  },
  {
    id: 4,
    month: "April",
  },
  {
    id: 5,
    month: "Mei",
  },
  {
    id: 6,
    month: "Juni",
  },
  {
    id: 7,
    month: "Juli",
  },
  {
    id: 8,
    month: "Agustus",
  },
  {
    id: 9,
    month: "September",
  },
  {
    id: 10,
    month: "Oktober",
  },
  {
    id: 11,
    month: "November",
  },
  {
    id: 12,
    month: "Desember",
  },
];
