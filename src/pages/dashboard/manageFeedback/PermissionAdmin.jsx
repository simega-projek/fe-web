import {
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

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { DetailModal } from "../../../components/Fragments/Detail/DetailModal";
import {
  deleteObject,
  getAllObject,
  updateObject,
} from "../../../services/object.service";
import { toView } from "../../../utils/toView";
// import CreateObjek from "./CreateObjek";
import { BsEnvelopeOpenFill } from "react-icons/bs";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { FilterObject } from "../../../components/Fragments/Filter/FilterObjek";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { SkletonTableData } from "../../../components/Fragments/Skleton/SkletonTableData";
import UpdateObjek from "../manageObjek/UpdateObjek";

export default function PermissionAdmin() {
  const [objectData, setObjectData] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  const [selectedObjectData, setSelectedObjectData] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [dataPage, setDataPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);
  const startIndex = (currentPage - 1) * contentPage;

  // filter
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [valley, setValley] = useState("");
  const [site, setSite] = useState("");
  const [category, setCategory] = useState("");

  const handleOpenUpdateForm = (id) => {
    setSelectedId(id);
    setIsOpenUpdateForm(true);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenDetailModal = (objectData) => {
    setIsDetailModalOpen(true);
    setSelectedObjectData(objectData);
    // console.log(selectedObjectData);
  };

  // Function to close the detail modal

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
        "pending",
      );

      setObjectData(objects.data);
      setDataPage(objects.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

  const handlePublish = async (e) => {
    setIsLoading(true);
    const value = e.target.value; // Ambil nilai dari tombol yang ditekan
    const { ID } = selectedObjectData;

    const data = {
      ...selectedObjectData,
      publish: value,
    };

    try {
      const res = await updateObject(ID, data);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
      } else {
        setMessageSuccess(res.message);
        setMessageError(null);
        setIsDetailModalOpen(false);
        fetchObject();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilter = () => {
    setSearch("");
    setValley("");
    setSite("");
    setCategory("");
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  useEffect(() => {
    fetchObject();
  }, [debouncedSearch, currentPage, contentPage, valley, site, category]);

  // console.log({ objectData });

  return (
    <>
      <UpdateObjek
        isOpenUpdate={isOpenUpdateForm}
        id={selectedId}
        onSuccess={fetchObject}
        onClose={() => setIsOpenUpdateForm(false)}
      />

      {/* table data */}
      <hr />
      <TitleSection className="my-5 flex px-3 underline">
        <BsEnvelopeOpenFill /> Permintaan Izin
      </TitleSection>
      <hr />

      {/* filter & search */}
      <div className="mt-5 w-full px-3">
        <div className="flex justify-between gap-1">
          <FilterObject
            publish={null}
            search={search}
            onSearch={(e) => setSearch(e.target.value)}
            valley={valley}
            onValley={(e) => setValley(e.target.value)}
            site={site}
            onSite={(e) => setSite(e.target.value)}
            category={category}
            onCategory={(e) => setCategory(e.target.value)}
            onReset={handleResetFilter}
          />
          <FilterPage
            className={"w-1/3 md:w-fit"}
            onChange={(e) => setContentPage(e.target.value)}
            value={contentPage}
          />
        </div>
        {/* <DetailModal /> */}

        {/* alert */}
        <AlertMessage
          className="mt-5"
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />

        {/* table */}
        <div className="scrollbar mt-5 overflow-x-auto">
          <Table hoverable className="scrollbar overflow-x-auto md:table-fixed">
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-1/5">Nama</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Jenis Pemanfaatan</TableHeadCell>
              <TableHeadCell className="w-1/5">
                Detail Pemanfaatan
              </TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableData
              data={objectData}
              startIndex={startIndex}
              handleOpenDetailModal={handleOpenDetailModal}
              handleOpenUpdateForm={handleOpenUpdateForm}
              handleOpenDeleteModal={handleOpenDeleteModal}
              searchData={search}
              isLoading={isLoading}
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

      {/* detail modal */}
      <DetailModal
        detailList={true}
        openModal={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedObjectData?.nama_objek}
        img={selectedObjectData?.gambar}
        category={selectedObjectData?.category?.category}
        desc={selectedObjectData?.deskripsi}
        status={selectedObjectData?.publish}
        date={selectedObjectData?.UpdatedAt}
        site={selectedObjectData?.site?.nama_situs}
        valley={selectedObjectData?.site?.lembah?.lembah}
        lintang={selectedObjectData?.lintang}
        bujur={selectedObjectData?.bujur}
      >
        <p className="text- font-bold">Publis sebagai</p>
        <ButtonFunc
          className="bg-primary text-white"
          onClick={handlePublish}
          value="approve"
          disabled={isLoading}
        >
          Terima
        </ButtonFunc>
        <ButtonFunc
          className="bg-tan text-white"
          onClick={handlePublish}
          value="reject"
          disabled={isLoading}
        >
          Tolak
        </ButtonFunc>
      </DetailModal>
    </>
  );
}

const TableData = ({
  data,
  startIndex,
  handleOpenDetailModal,
  handleOpenUpdateForm,
  handleOpenDeleteModal,
  isLoading,
  searchData,
}) => {
  return (
    <TableBody className="divide-y">
      {isLoading ? (
        <SkletonTableData field={6} />
      ) : data?.length > 0 ? (
        data?.map((objects, index) => (
          <TableRow key={objects?.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex + 1}
            </TableCell>
            <TableCell className="truncate whitespace-normal font-medium text-gray-900 dark:text-white">
              {objects?.nama_objek ?? "-"}{" "}
            </TableCell>
            <TableCell className="truncate whitespace-normal">
              {objects?.category?.category ?? "-"}
            </TableCell>
            <TableCell className="truncate whitespace-normal">
              {objects?.site?.lembah?.lembah ?? "-"}
            </TableCell>
            <TableCell className="truncate whitespace-normal">
              {objects?.site?.nama_situs ?? "-"}
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              {/* open detail */}
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                onClick={() => handleOpenDetailModal(objects)}
              />
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(objects?.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(objects?.ID)}
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
