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

import TitleSection from "../../../components/Elements/TitleSection";

import { FaEdit, FaSearch, FaSitemap } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { deleteSite, getAllSite } from "../../../services/site.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { toView } from "../../../utils/toView";
import CreateSitus from "./CreateSitus";
import UpdateSitus from "./UpdateSitus";

export default function SitusAdmin() {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [siteData, setSiteData] = useState("");

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

  const handleDeleteSite = async () => {
    const res = await deleteSite(selectedId);
    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      toView("top");
    } else {
      setMessageError(null);
      setMessageSuccess(res.message);
    }
    setIsOpenModalDelete(false);
    handleSuccess();
  };

  const fetchSite = async () => {
    setIsLoading(true);
    try {
      const site = await getAllSite(contentPage, debouncedSearch, currentPage);

      setSiteData(site.data);
      setDataPage(site.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    setCurrentPage(e);
    toView("top");
  };

  const handleSuccess = () => {
    fetchSite();
  };

  useEffect(() => {
    fetchSite();
  }, [debouncedSearch, currentPage, contentPage]);

  // console.log(selectedId);
  return (
    <>
      <CreateSitus
        isOpenCreate={isOpenCreateForm}
        onSuccess={handleSuccess}
        onClose={handleOpenCreateForm}
      />
      <UpdateSitus
        isOpenUpdate={isOpenUpdateForm}
        onSuccess={handleSuccess}
        onClose={() => setIsOpenUpdateForm(false)}
        id={selectedId}
      />

      {/* table data */}
      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaSitemap /> Data Situs
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Situs..."
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

        {/* table */}
        <div className="scrollbar mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Nama Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Desa/Kelurahan</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableData
              isLoading={isLoading}
              data={siteData}
              startIndex={startIndex}
              searchData={search}
              handleOpenUpdateForm={handleOpenUpdateForm}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          </Table>
        </div>
      </div>

      {/* pagination */}
      {isLoading ? null : (
        <PaginationPage
          className={"mt-5"}
          currentPage={currentPage}
          totalPages={dataPage?.totalPages}
          onPageChange={onPageChange}
          totalItems={dataPage?.totalItems}
        />
      )}

      {/* delete modal */}
      {isOpenModalDelete && (
        <PopupConfirm
          title={"menghapus data situs"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteSite}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  isLoading,
  data,
  startIndex,
  searchData,
  handleOpenUpdateForm,
  handleOpenDeleteModal,
}) => {
  return (
    <TableBody className="divide-y">
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={5} className="text-center">
            <Loading />
          </TableCell>
        </TableRow>
      ) : data?.length > 0 ? (
        data?.map((site, index) => (
          <TableRow key={site?.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex}
            </TableCell>
            <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
              {site?.nama_situs ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {site?.lembah.lembah ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {getDataByIndex(site?.desa_kelurahan, 0) ??
                site?.desa_kelurahan ??
                "-"}
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(site?.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(site?.ID)}
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
