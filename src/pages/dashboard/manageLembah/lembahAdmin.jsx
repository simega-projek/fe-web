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
import { GiValley } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import Loading from "../../../components/Elements/Loading/Loading";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { deleteValley, getAllValley } from "../../../services/valley.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { toView } from "../../../utils/toView";
import CreateObjek from "./CreateLembah";
import UpdateLembah from "./UpdateLembah";

export default function LembahAdmin() {
  const [selectedId, setSelectedId] = useState(null);
  const [valleyData, setValleyData] = useState([]);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const [dataPage, setDataPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);
  const startIndex = (currentPage - 1) * contentPage + 1;

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

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const fetchValley = async () => {
    setIsLoading(true);
    try {
      const valley = await getAllValley(
        contentPage,
        debouncedSearch,
        currentPage,
      );

      setValleyData(valley.data);
      setDataPage(valley.pagination);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteValley = async () => {
    const res = await deleteValley(selectedId);
    // console.log("delete = ", res);

    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      setIsOpenModalDelete(false);
      toView("top");
    } else {
      setMessageError(null);
      setMessageSuccess(res.message);
    }
    setIsOpenModalDelete(false);
    handleSuccess();
  };

  const handleSuccess = () => {
    fetchValley();
  };

  const onPageChange = (e) => {
    setCurrentPage(e);
    toView("top");
  };

  useEffect(() => {
    fetchValley();
  }, [debouncedSearch, currentPage, contentPage]);

  return (
    <>
      <CreateObjek
        isOpenCreate={isOpenCreateForm}
        onSuccess={handleSuccess}
        onClose={handleOpenCreateForm}
      />

      <UpdateLembah
        isOpenUpdate={isOpenUpdateForm}
        onSuccess={handleSuccess}
        id={selectedId}
        onClose={() => setIsOpenUpdateForm(false)}
      />

      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiValley /> Data Lembah
      </TitleSection>
      <hr />
      <div className="mt-5 w-full px-3">
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Lembah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <FilterPage
              onChange={(e) => setContentPage(e.target.value)}
              value={contentPage}
            />
            <Button
              onClick={handleOpenCreateForm}
              className="bg-primary text-xl font-bold focus:ring-blackboard"
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

            {/* table data */}
            <TableData
              searchData={search}
              isLoading={isLoading}
              data={valleyData}
              handleOpenUpdateForm={handleOpenUpdateForm}
              handleOpenDeleteModal={handleOpenDeleteModal}
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

      {isOpenModalDelete && (
        <PopupConfirm
          title={"menghapus data lembah"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteValley}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  isLoading,
  data,
  handleOpenUpdateForm,
  handleOpenDeleteModal,
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
        data?.map((valley, index) => (
          <TableRow key={valley?.ID}>
            <TableCell className="whitespace-normal">{index + 1}</TableCell>
            <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
              {valley?.lembah ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {valley?.provinsi ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {getDataByIndex(valley?.kabupaten_kota, 0) ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {getDataByIndex(valley?.kecamatan, 0) ?? "-"}
            </TableCell>

            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(valley?.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(valley?.ID)}
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
