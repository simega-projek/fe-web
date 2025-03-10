import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaSearch, FaUndoAlt } from "react-icons/fa";
import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { CardFeedback } from "../../../components/Fragments/Cards/CardFeedback";
import {
  deleteFeedback,
  getAllFeedback,
} from "../../../services/feedback.service";
import { useDebounce } from "use-debounce";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import Loading from "../../../components/Elements/Loading/Loading";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { toView } from "../../../utils/toView";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { FilterFeedback } from "./FilterFeedback";

export const FeedbackAdmin = () => {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [dataPage, setDataPage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);

  // filter
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [debouncedYear] = useDebounce(year, 1000);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const feedback = await getAllFeedback(
        contentPage,
        debouncedSearch,
        currentPage,
        date,
        month,
        year,
      );
      const sortedData = feedback.data.sort(
        (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt),
      );
      setDataFeedback(sortedData);
      setDataPage(feedback.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFeedback = async () => {
    const res = await deleteFeedback(selectedId);
    // console.log("delete = ", res);

    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      setIsOpenModalDelete(false);
    } else {
      setMessageError(null);
      setMessageSuccess(res.message);
    }
    setIsOpenModalDelete(false);
    fetchFeedback();
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };
  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleResetFilter = () => {
    setSearch("");
    setDate("");
    setMonth("");
    setYear("");
  };

  useEffect(() => {
    fetchFeedback();
  }, [currentPage, debouncedSearch, date, month, debouncedYear, contentPage]);

  return (
    <div className="px-3">
      <hr />
      <TitleSection className="my-5 flex underline">
        <BiSolidMessageDetail /> Umpan Balik Masyarakat
      </TitleSection>
      <hr />

      {/* search & button filter */}
      <div className="my-5 flex w-full justify-between">
        <FilterFeedback
          date={date}
          month={month}
          year={year}
          search={search}
          onDate={(e) => setDate(e.target.value)}
          onMonth={(e) => setMonth(e.target.value)}
          onYear={(e) => setYear(e.target.value)}
          onSearch={(e) => setSearch(e.target.value)}
          onReset={handleResetFilter}
          isLoading={isLoading}
        />

        <FilterPage
          onChange={(e) => setContentPage(e.target.value)}
          value={contentPage}
        />
      </div>

      {/* alert */}
      <AlertMessage
        className={"mb-3"}
        messageError={messageError}
        messageSuccess={messageSuccess}
        setMessageError={setMessageError}
        setMessageSuccess={setMessageSuccess}
      />

      {/* data feedback */}
      <FeedbackData
        data={dataFeedback}
        isLoading={isLoading}
        search={search}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />

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
          title={"menghapus data feedback"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteFeedback}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </div>
  );
};

const FeedbackData = ({ data, isLoading, search, handleOpenDeleteModal }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {isLoading ? (
        <div className="col-span-2 text-center">
          <Loading />
        </div>
      ) : data?.length > 0 ? (
        data.map((fd) => (
          <CardFeedback
            key={fd.ID}
            name={fd.name}
            address={fd.email_telp}
            date={fd.CreatedAt}
            message={fd.message}
            onDelete={() => handleOpenDeleteModal(fd.ID)}
          />
        ))
      ) : (
        !isLoading && (
          <div className="col-span-2 text-center text-red-500">
            data {search} tidak ditemukan
          </div>
        )
      )}
    </div>
  );
};
