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
import TitleSection from "../../../components/Elements/TitleSection";

import { FaFileInvoice } from "react-icons/fa6";
import { GiStoneBust } from "react-icons/gi";

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { getAllObject } from "../../../services/object.service";
import CreateObjek from "./CreateObjek";

export default function ObjekAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const [objectData, setObjectData] = useState([]);

  const fetchObject = async () => {
    try {
      const objects = await getAllObject();
      setObjectData(objects.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObject();
  }, []);

  console.log(objectData);

  return (
    <>
      <CreateObjek isOpenCreate={isOpenCreate} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiStoneBust /> Data Objek Megalit
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Objek, Situs, Lembah..."
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
              <TableHeadCell className="w-2/5">Objek</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {objectData?.length > 0 &&
                objectData?.map((objects, index) => (
                  <TableRow key={objects.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {objects.nama_objek ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {objects.category.category ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {objects.site.lembah.lembah ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {objects.site.nama_situs ?? "-"}
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaFileInvoice}
                        to={`/artikel/${objects.id}`}
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
