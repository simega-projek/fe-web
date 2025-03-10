import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";

import { FaFileInvoice } from "react-icons/fa6";
import { GiStoneBust } from "react-icons/gi";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { deleteObject, getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";
import CreateObjek from "./CreateObjek";
import { FilterObject } from "./FilterObjek";
import UpdateObjek from "./UpdateObjek";

export default function ObjekAdmin() {
  const [objectData, setObjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const [dataPage, setDataPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);
  const startIndex = (currentPage - 1) * contentPage + 1;
  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [publish, setPublish] = useState("");
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");

  const handleOpenCreateForm = () => {
    setIsOpenCreateForm(!isOpenCreateForm);
    setIsOpenUpdateForm(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenUpdateForm = (id) => {
    setSelectedId(id);
    setIsOpenUpdateForm(true);
    setIsOpenCreateForm(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const fetchObject = async () => {
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

      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdateAt) - new Date(a.UpdateAt),
      );
      setObjectData(sortedData);
      setDataPage(objects.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleResetFilter = () => {
    setSearch("");
    setPublish("");
    setValley("");
    setSite("");
    setCategory("");
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const handleDeleteObject = async () => {
    const res = await deleteObject(selectedId);
    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      toView("top");
    } else {
      setMessageSuccess(res.message);
      setMessageError(null);
    }
    setIsOpenModalDelete(false);
    fetchObject();
  };

  useEffect(() => {
    fetchObject();
  }, [
    debouncedSearch,
    currentPage,
    contentPage,
    publish,
    valley,
    site,
    category,
  ]);

  // console.log({ objectData });

  // console.log({ selectedId });

  return (
    <>
      <CreateObjek
        isOpenCreate={isOpenCreateForm}
        onSuccess={fetchObject}
        onClose={handleOpenCreateForm}
      />

      <UpdateObjek
        isOpenUpdate={isOpenUpdateForm}
        id={selectedId}
        onSuccess={fetchObject}
        onClose={() => setIsOpenUpdateForm(false)}
      />

      {/* table data */}
      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiStoneBust /> Data Objek Megalit
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <FilterObject
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
            objectData={objectData}
          />
          <div className="ml-2 flex flex-col-reverse gap-2 lg:flex-row">
            <FilterPage
              onChange={(e) => setContentPage(e.target.value)}
              value={contentPage}
              className={"ml-0"}
            />
            <Button
              onClick={handleOpenCreateForm}
              className="bg-primary text-xl font-bold text-white hover:bg-tan focus:ring-tan"
            >
              +
            </Button>
          </div>
        </div>

        {/* alert */}
        <AlertMessage
          className={"mt-5"}
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />

        {/* table */}
        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Objek</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            {/* table data */}
            <TableData
              data={objectData}
              isLoading={isLoading}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenUpdateForm={handleOpenUpdateForm}
              searchData={search}
              startIndex={startIndex}
            />
          </Table>
        </div>
      </div>

      {/* pagination */}
      {isLoading ? null : (
        <PaginationPage
          currentPage={currentPage}
          totalPages={dataPage?.totalPages}
          onPageChange={onPageChange}
          totalItems={dataPage?.totalItems}
        />
      )}

      {/* delete modal */}
      {isOpenModalDelete && (
        <PopupConfirm
          title={"menghapus kegiatan"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteObject}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  data,
  isLoading,
  startIndex,
  handleOpenDeleteModal,
  handleOpenUpdateForm,
  searchData,
}) => {
  return (
    <TableBody className="divide-y">
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            <Loading />
          </TableCell>
        </TableRow>
      ) : data?.length > 0 ? (
        data?.map((objects, index) => (
          <TableRow key={objects.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex}
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
              {objects.publish ? (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${objects.publish === "public" ? "bg-green-100 text-green-800" : objects.publish === "private" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {objects.publish ?? null}
                </span>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                to={`/objek/${objects.ID}/${objects.nama_objek}`}
              />
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(objects.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(objects.ID)}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        !isLoading && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-red-500">
              data {searchData} tidak ditemukan
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};
