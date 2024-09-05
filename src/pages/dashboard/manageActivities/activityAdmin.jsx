import React, { useEffect, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  Button,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import {
  FaFileInvoice,
  FaBookmark,
  FaSearch,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import CreateActivity from "./CreateActivity";
import { useSearchParams } from "react-router-dom";

export default function ActivityAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [searchParams] = useSearchParams();
  // const querySearch = searchParams.get("search")

  const [searchTerm, setSearchTerm] = useState("");
  const [resultActivity, setResultActivity] = useState([]);
  const [debouncedSearch] = useDebounce(searchTerm, 1000);

  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   if (debouncedSearch) {
  //     const result = articleData.filter(
  //       (act) =>
  //         act.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  //         act.category
  //           .toLowerCase()
  //           .includes(debouncedSearch.toLocaleLowerCase()),
  //     );
  //     setResultActivity(result);
  //   } else {
  //     setResultActivity(articleData);
  //   }
  // }, [debouncedSearch, articleData]);

  return (
    <>
      <CreateActivity isOpenCreate={isOpenCreate} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaBookmark /> Data Kegiatan
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Kegiatan..."
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
          <div className="ml-2">
            <Button
              onClick={handleOpenCreateForm}
              className="bg-primary text-xl font-bold focus:ring-blackboard"
            >
              +
            </Button>
          </div>
        </div>

        {/* table */}
        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Link Pendaftaran</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {/* {resultActivity?.length > 0 &&
                resultActivity?.map((a, index) => (
                  <TableRow key={a.id}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {a.title}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {a.date ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <img src={a.image} alt={a.title} className="h-10" />
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <a href={a.fileUrl} download>
                        {a.fileName ?? "-"}
                      </a>
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaFileInvoice}
                        to={`/artikel/${a.id}`}
                      />
                      <ButtonControls icon={FaEdit} />
                      <ButtonControls icon={MdDeleteForever} />
                    </TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
