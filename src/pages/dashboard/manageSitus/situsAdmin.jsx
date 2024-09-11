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

import { FaEdit, FaSearch, FaSitemap } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { getAllSite } from "../../../services/site.service";
import CreateSitus from "./CreateSitus";

export default function SitusAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const [siteData, setSiteData] = useState("");

  const fetchSite = async () => {
    try {
      const site = await getAllSite();
      setSiteData(site.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSite();
  }, []);

  console.log(siteData);
  return (
    <>
      <CreateSitus isOpenCreate={isOpenCreate} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaSitemap /> Data Situs
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput icon={FaSearch} placeholder="Cari Situs..." />
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
              <TableHeadCell className="w-2/5">Nama Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Desa/Kelurahan</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {siteData?.length > 0 &&
                siteData?.map((site, index) => (
                  <TableRow key={site.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {site.nama_situs ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {site.lembah.lembah ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {site.desa_kelurahan ?? "-"}
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
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
