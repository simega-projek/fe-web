import {
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

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { GrValidate } from "react-icons/gr";
import { useDebounce } from "use-debounce";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import Loading from "../../../components/Elements/Loading/Loading";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import {
  deleteObject,
  getAllObject,
  updateObject,
} from "../../../services/object.service";
import { toView } from "../../../utils/toView";
import { DetailModal } from "../../../components/Fragments/Detail/DetailModal";
// import CreateObjek from "./CreateObjek";
import UpdateObjek from "../manageObjek/UpdateObjek";

export default function PublicationAdmin() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [objectData, setObjectData] = useState([]);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  const [selectedObjectData, setSelectedObjectData] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const objects = await getAllObject(200, debouncedSearch);
      setObjectData(objects.data);
    } catch (err) {
      console.log(err);
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
    const { ID, lintang, bujur, deskripsi, site_id, category_id, gambar } =
      selectedObjectData || {};

    // Buat objek data
    const data = {
      nama_objek: value,
      lintang,
      bujur,
      deskripsi,
      site_id,
      category_id,
      gambar,
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

  console.log(isLoading);

  useEffect(() => {
    fetchObject();
  }, [debouncedSearch]);

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
          <div className="w-full lg:w-1/3">
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={FaSearch}
              placeholder="Cari berdasarkan Objek dan kategori..."
            />
            <DetailModal />
          </div>
        </div>

        {/* alert */}
        <div className="mt-5">
          {(messageError && (
            <FailAllert setMessageError={setMessageError}>
              {messageError}
            </FailAllert>
          )) ||
            (messageSuccess && (
              <SuccessAlert setMessageSuccess={setMessageSuccess}>
                {messageSuccess}
              </SuccessAlert>
            ))}
        </div>

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
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* loading fetching */}
      {isLoading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : null}

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
          value="Public"
          disabled={isLoading}
        >
          Publik
        </ButtonFunc>
        <ButtonFunc
          className="bg-tan text-white"
          onClick={handlePublish}
          value="Private"
          disabled={isLoading}
        >
          Private
        </ButtonFunc>
      </DetailModal>
    </>
  );
}
