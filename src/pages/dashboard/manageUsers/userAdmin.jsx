import React, { useEffect, useMemo, useRef, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  Button,
  FileInput,
  Label,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { FaFileInvoice } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";

import { FaSearch, FaEdit, FaUsers } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { useDispatch, useSelector } from "react-redux";
import { fecthArticleData } from "../../../redux/actions/articleAction";

import Loading from "../../../components/Elements/Loading/Loading";
import CreateAdmin from "./CreateAdmin";

export default function UserAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const { articleData, isLoading } = useSelector((state) => state.article);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthArticleData());
    console.log("------");
    console.log(articleData);
  }, [dispatch]);

  return (
    <>
      <CreateAdmin isOpenCreate={isOpenCreate} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaUsers /> User Admin
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput icon={FaSearch} placeholder="Cari Akun Admin..." />
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
              <TableHeadCell className="w-2/5">Nama</TableHeadCell>
              <TableHeadCell className="w-1/5">Username</TableHeadCell>
              <TableHeadCell className="w-1/5">email</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {articleData?.length > 0 &&
                articleData?.map((a, index) => (
                  <TableRow key={a.id}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {a.title ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {a.date ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <img src={a.image} alt={a.title} className="h-10" />
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
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
