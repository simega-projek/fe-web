import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import TitleSection from "../../../components/Elements/TitleSection";
import { Dropdown, DropdownItem, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import InputDropdown from "../../../components/Elements/Inputs/InputDropdown";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { CardFeedback } from "../../../components/Fragments/Cards/CardFeedback";

export const FeedbackAdmin = () => {
  const dayDate = () => {
    const day = [];
    for (let i = 1; i <= 31; i++) {
      day.push(i);
    }

    return day;
  };
  const day = dayDate();

  return (
    <div className="px-3">
      <hr />
      <TitleSection className="my-5 flex underline">
        <BiSolidMessageDetail /> Umpan Balik Masyarakat
      </TitleSection>
      <hr />

      {/* search & button filter */}
      <div className="my-5 flex w-full flex-wrap gap-3 md:flex-nowrap md:justify-center">
        {/* search */}
        <div className="w-full md:w-1/2">
          <TextInput
            //   value={search}
            //   onChange={(e) => setSearch(e.target.value)}
            icon={FaSearch}
            placeholder="Cari berdasarkan nama..."
          />
        </div>

        {/* tanggal */}
        <div className="w-full md:w-1/6">
          <select
            id="day"
            className="w-full rounded-md"
            //   onChange={handleCategoryChange}
            //   disabled={isLoading}
            //   value={selectedCategory}
          >
            <option>Tanggal</option>
            {day.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* bulan */}
        <div className="w-full md:w-1/6">
          <select
            id="month"
            className="w-full rounded-md"
            //   onChange={handleCategoryChange}
            //   disabled={isLoading}
            //   value={selectedCategory}
          >
            <option>Bulan</option>
            {months?.map((month) => (
              <option key={month.id} value={month.id}>
                {month.month}
              </option>
            ))}
          </select>
        </div>

        {/* tahun */}
        <div className="w-full md:w-1/6">
          <TextInput
            id="year"
            type="number"
            placeholder="Tahun"
            //   value={nameObject}
            //   onChange={(e) => setNameObject(e.target.value)}
            //   disabled={isLoading}
          />
        </div>

        <div className="w-full md:w-1/6">
          <ButtonFunc>Cari</ButtonFunc>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {dataFeedback.map((fd) => (
          <CardFeedback
            key={fd.id}
            name={fd.name}
            address={fd.address}
            date={fd.date.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              weekday: "long",
              year: "numeric",
            })}
            message={fd.message}
          />
        ))}
      </div>
    </div>
  );
};

const date = new Date(new Date() - Math.random() * 1e12);
const date1 = new Date(new Date() - Math.random() * 1e12);
const date2 = new Date(new Date() - Math.random() * 1e12);
// console.log(date);

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
const dataFeedback = [
  {
    id: 1,
    name: "Andi",
    address: "08521859158x",
    message: "Pelayanan tidak baik",
    date: date,
  },
  {
    id: 2,
    name: "Andi",
    address: "08521859158x",
    message:
      "Aute incididunt incididunt enim consequat quis sit sunt eiusmod. Aute duis consequat voluptate quis qui cupidatat pariatur sint minim. Nostrud do voluptate eiusmod sunt fugiat excepteur sit exercitation est ex aliqua qui. Est reprehenderit est deserunt non labore.",
    date: date1,
  },
  {
    id: 3,
    name: "Andi",
    address: "08521859158x",
    message:
      "Eiusmod Lorem officia consequat amet. Ex reprehenderit ullamco exercitation et officia do veniam amet id eu velit consectetur ut est. Incididunt aute voluptate qui est Lorem velit proident elit quis duis officia enim. Exercitation elit adipisicing consectetur deserunt do qui id pariatur amet quis in proident. Pariatur voluptate velit cupidatat deserunt. Et elit eiusmod adipisicing proident adipisicing minim. Ipsum nulla elit adipisicing ea labore esse.Lorem aute cillum quis et voluptate exercitation cillum consequat consectetur voluptate labore. Velit fugiat tempor labore esse sunt. Mollit excepteur amet minim minim. Laborum Lorem laboris ex exercitation esse magna esse culpa tempor nisi. Pariatur incididunt veniam nostrud incididunt voluptate non magna nulla elit cillum ipsum ipsum. Nulla cillum elit nisi anim cillum adipisicing minim deserunt. Laboris commodo mollit ipsum labore amet.Deserunt do in adipisicing aliquip minim consectetur commodo sit velit aute. Aute irure do ut reprehenderit commodo reprehenderit id. Enim dolor ea nisi nulla fugiat irure quis aute do laborum ut. Incididunt anim ut id sunt excepteur reprehenderit ipsum ad nisi. Dolor incididunt nulla eu veniam ea enim in. Mollit adipisicing occaecat nulla irure magna dolor ad laboris veniam nisi. Cupidatat nostrud ipsum labore esse amet duis et nostrud.",
    date: date2,
  },
];
