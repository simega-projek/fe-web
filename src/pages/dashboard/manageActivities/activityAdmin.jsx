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

export default function ActivityAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  // const querySearch = searchParams.get("search")

  const [searchData, setSearchData] = useState("");
  const [filter, setFilter] = useState("");

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
      );

      const sortedData = events.data.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date),
      );

      // console.log(sortedData);
      setEventData(sortedData);
      setFilteredEvents(sortedData);
      setDataPage(events.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (e) => {
    const filterStatus = e.target.value;
    setFilter(filterStatus);
    if (filterStatus) {
      const filtered = eventData.filter(
        (item) => item.status === e.target.value,
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(eventData);
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
  }, [debouncedSearch, currentPage, contentPage]);

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
            filter={filter}
            onFilter={handleFilter}
          />

          <div className="flex gap-2">
            {/* filter tampilan data */}.
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
          <Table hoverable className="scrollbar overflow-x-auto md:table-fixed">
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Link Pendaftaran</TableHeadCell>
              <TableHeadCell className="w-1/5">Gambar</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableData
              data={filteredEvents}
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
              className="truncate whitespace-normal text-wrap"
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
              {event?.status ?? "-"}
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

const FilterEvent = ({ search, onSearch, filter, onFilter }) => {
  return (
    <div className="flex w-full gap-2 lg:w-1/2">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-full"
      />
      <Select value={filter} onChange={onFilter} className="w-1/2">
        <option value={""}>Status</option>
        <option value={"Akan Datang"}>Akan Datang</option>
        <option value={"Proses"}>Sedang Berlangsung</option>
        <option value={"Selesai"}>Selesai</option>
      </Select>
    </div>
  );
};
