import React, { useEffect, useState } from "react";
import TitleSection from "../../../components/Elements/TitleSection";
import {
  Button,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import {
  FaFileInvoice,
  FaBookmark,
  FaSearch,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "use-debounce";
import CreateActivity from "./CreateActivity";
import { useSearchParams } from "react-router-dom";
import { deleteEvent, getAllEvent } from "../../../services/event.service";
import { formatDate } from "../../../utils/formatDate";
import Loading from "../../../components/Elements/Loading/Loading";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { toView } from "../../../utils/toView";
import UpdateActivity from "./UpdateActivity";

export default function ActivityAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [eventData, setEventData] = useState([]);
  // const querySearch = searchParams.get("search")

  const [searchTerm, setSearchTerm] = useState("");
  const [resultActivity, setResultActivity] = useState([]);
  const [debouncedSearch] = useDebounce(searchTerm, 1000);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
      toView("top");
      setIsOpenModalDelete(false);
      handleSuccess();
    } catch (err) {
      console.log(err);
    }
  };
  const fetchEvent = async () => {
    setFetchLoading(true);
    try {
      const events = await getAllEvent(100, debouncedSearch);
      setEventData(events.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
  }, [debouncedSearch]);

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
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Kegiatan..."
              onChange={handleSearch}
              value={searchTerm}
            />
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
        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Link Pendaftaran</TableHeadCell>
              <TableHeadCell className="w-1/5">Gambar</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal Kegiatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {eventData?.length > 0 &&
                eventData?.map((event, index) => (
                  <TableRow key={event.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {event?.title}
                    </TableCell>
                    <TableCell
                      className="whitespace-normal break-words"
                      style={{ tableLayout: "fixed" }}
                    >
                      <a href={event?.registration_link} target="_blank">
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
                        icon={FaFileInvoice}
                        to={`/kegiatan/${event?.ID}/${event?.title}`}
                      />
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdateForm(event?.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(event?.ID)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* loading fetching */}
      {fetchLoading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : null}

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
