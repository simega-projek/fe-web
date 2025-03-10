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

import { GrValidate } from "react-icons/gr";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import Loading from "../../../components/Elements/Loading/Loading";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { DetailModal } from "../../../components/Fragments/Detail/DetailModal";
import {
  deleteObject,
  getAllObject,
  updateObject,
} from "../../../services/object.service";
import { toView } from "../../../utils/toView";
// import CreateObjek from "./CreateObjek";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import UpdateObjek from "../manageObjek/UpdateObjek";
import { FilterObject } from "./FilterPublication";

export default function PublicationAdmin() {
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
  const [debouncedSearch] = useDebounce(search, 1000);
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
    console.log(selectedObjectData);
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
    const {
      ID,
      lintang,
      bujur,
      deskripsi,
      site_id,
      category_id,
      gambar,
      nama_objek,
    } = selectedObjectData || {};

    // Buat objek data
    const data = {
      nama_objek,
      lintang,
      bujur,
      deskripsi,
      site_id,
      category_id,
      gambar,
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

  // console.log({ selectedId });

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
        <GrValidate /> Validasi Publikasi Objek
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
            onReset={handleResetFilter}
          />
          <FilterPage
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
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Objek</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableData
              data={objectData}
              startIndex={startIndex}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenDetailModal={handleOpenDetailModal}
              handleOpenUpdateForm={handleOpenUpdateForm}
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

      <DetailModal
        openModal={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedObjectData?.nama_objek}
        img={selectedObjectData?.gambar}
        category={selectedObjectData?.category?.category}
        desc={selectedObjectData?.deskripsi}
      >
        <p className="text- font-bold">Publis sebagai</p>
        <ButtonFunc
          className="bg-primary text-white"
          onClick={handlePublish}
          value="public"
          disabled={isLoading}
        >
          Publik
        </ButtonFunc>
        <ButtonFunc
          className="bg-tan text-white"
          onClick={handlePublish}
          value="private"
          disabled={isLoading}
        >
          Private
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
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            <Loading />
          </TableCell>
        </TableRow>
      ) : data?.length > 0 ? (
        data?.map((objects, index) => (
          <TableRow key={objects.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex + 1}
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
              {/* open detail */}
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                onClick={() => handleOpenDetailModal(objects)}
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
