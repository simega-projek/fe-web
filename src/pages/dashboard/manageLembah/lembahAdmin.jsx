import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import TitleSection from "../../../components/Elements/TitleSection";

import { GiValley } from "react-icons/gi";

import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { getAllValley } from "../../../services/valley.service";
import CreateObjek from "./CreateLembah";

export default function LembahAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [valleyData, setValleyData] = useState([]);

  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const fetchValley = async () => {
    try {
      const valley = await getAllValley();
      setValleyData(valley.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchValley();
  }, []);

  console.log(valleyData);
  return (
    <>
      <CreateObjek isOpenCreate={isOpenCreate} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiValley /> Data Lembah
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput icon={FaSearch} placeholder="Cari Lembah..." />
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
              <TableHeadCell className="w-2/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Provinsi</TableHeadCell>
              <TableHeadCell className="w-1/5">Kabupaten</TableHeadCell>
              <TableHeadCell className="w-1/5">Kecamatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {valleyData?.length > 0 &&
                valleyData?.map((valley, index) => (
                  <TableRow key={valley.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {valley.lembah ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {valley.provinsi ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {valley.kabupaten_kota ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {valley.kecamatan ?? "-"}
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaFileInvoice}
                        to={`/artikel/${valley.id}`}
                        className={"hover:"}
                      />
                      <ButtonControls icon={FaEdit} />
                      <ButtonControls icon={MdDeleteForever} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
