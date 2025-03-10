import {
  Button,
  Select,
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

import { FaBookmark, FaEdit, FaFileInvoice, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { deleteEvent, getAllEvent } from "../../../services/event.service";
import { formatDate } from "../../../utils/formatDate";
import { toView } from "../../../utils/toView";
import CreateActivity from "./CreateActivity";
import UpdateActivity from "./UpdateActivity";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { FilterEvent } from "./FilterEvent";

export default function ActivityAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [eventData, setEventData] = useState([]);

  // search and filter
  const [searchData, setSearchData] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 1000);

  const [dataPage, setDataPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);
  const startIndex = (currentPage - 1) * contentPage + 1;
  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
    setIsOpenUpdate(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenUpdateForm = (id) => {
    // alert("button update");
    setSelectedId(id);
    setIsOpenUpdate(true);
    setIsOpenCreate(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const handleDeleteEvent = async () => {
    try {
      const res = await deleteEvent(selectedId);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        setIsOpenModalDelete(false);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
      }
      // toView("top");
      setIsOpenModalDelete(false);
      handleSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvent = async () => {
    setIsLoading(true);
    try {
      const events = await getAllEvent(
        contentPage,
        debouncedSearch,
        currentPage,
        status,
      );

      const sortedData = events.data.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
      );

      // console.log(sortedData);
      setEventData(sortedData);
      setDataPage(events.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchEvent();
  };

  const onPageChange = (e) => {
    setCurrentPage(e);
    toView("top");
  };

  useEffect(() => {
    fetchEvent();
  }, [debouncedSearch, currentPage, contentPage, status]);

  console.log({ searchData, status });

  return (
    <>
      <CreateActivity
        isOpenCreate={isOpenCreate}
        onClose={handleOpenCreateForm}
        onSuccess={handleSuccess}
      />

      <UpdateActivity
        isOpenUpdate={isOpenUpdate}
        onSuccess={handleSuccess}
        id={selectedId}
        onClose={() => setIsOpenUpdate(false)}
      />
      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaBookmark /> Data Kegiatan
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <FilterEvent
            search={searchData}
            onSearch={(e) => setSearchData(e.target.value)}
            status={status}
            onStatus={(e) => setStatus(e.target.value)}
          />

          {/* //filter tampilan data */}

          <div className="ml-2 flex flex-col-reverse gap-2 md:flex-row">
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
        <div className="scrollbar mt-5 overflow-x-auto">
          <Table hoverable className="scrollbar overflow-x-auto lg:table-fixed">
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Kegiatan</TableHeadCell>
              <TableHeadCell className="hidden w-1/5 lg:table-cell">
                Link Pendaftaran
              </TableHeadCell>
              <TableHeadCell className="w-1/5">Gambar</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableData
              data={eventData}
              startIndex={startIndex}
              isLoading={isLoading}
              searchData={searchData}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenUpdateForm={handleOpenUpdateForm}
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
          title={"menghapus kegiatan"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteEvent}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  data,
  startIndex,
  isLoading,
  searchData,
  handleOpenUpdateForm,
  handleOpenDeleteModal,
}) => {
  return (
    <TableBody className="divide-y">
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={7} className="text-center">
            <Loading />
          </TableCell>
        </TableRow>
      ) : data?.length > 0 ? (
        data?.map((event, index) => (
          <TableRow key={event.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex}
            </TableCell>
            <TableCell className="whitespace-normal break-words font-medium text-gray-900 dark:text-white">
              {event?.title}
            </TableCell>
            <TableCell
              className="hidden w-1/5 truncate whitespace-normal text-wrap lg:table-cell"
              style={{ tableLayout: "fixed" }}
            >
              <a href={event?.registration_link} target="_blank" className="">
                {event?.registration_link ?? "-"}
              </a>
            </TableCell>
            <TableCell className="whitespace-normal">
              <img src={event?.image} alt={event?.title} />
            </TableCell>
            <TableCell className="whitespace-normal">
              {formatDate(event?.start_date) ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              <span
                className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${event.status === "Akan Datang" ? "bg-green-100 text-green-800" : event.status === "Proses" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              >
                {event?.status ?? "-"}
              </span>
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                to={`/kegiatan/${event?.ID}/${event?.title}`}
              />
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(event?.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(event?.ID)}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        !isLoading && (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-red-500">
              data {searchData} tidak ditemukan
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};
