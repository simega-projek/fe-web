import React, { useEffect, useState } from "react";
import { MdFeedback } from "react-icons/md";
import { useDebounce } from "use-debounce";
import TitleSection from "../../../components/Elements/TitleSection";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { CardFeedback } from "../../../components/Fragments/Cards/CardFeedback";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { DetailModal } from "../../../components/Fragments/Detail/DetailModal";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import { SkletonCardFeedback } from "../../../components/Fragments/Skleton/SkletonCardFeedback";
import {
  deleteFeedback,
  getAllFeedback,
} from "../../../services/feedback.service";
import { toView } from "../../../utils/toView";
import { FilterFeedback } from "./FilterFeedback";

export const ComplaintAdmin = () => {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [dataPage, setDataPage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);

  // filter
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const [debouncedYear] = useDebounce(year, 700);

  const handleOpenDetailModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsOpenDetailModal(true);
  };

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

      setDataFeedback(feedback?.data);
      setDataPage(feedback?.pagination);
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
        <MdFeedback /> Pengaduan Masyarakat
      </TitleSection>
      <hr />

      {/* search & button filter */}
      <div className="my-5 flex w-full justify-between gap-1">
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
          // onView={}
        />

        <FilterPage
          className={"w-1/3 md:w-1/5 lg:w-fit"}
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
        onView={handleOpenDetailModal}
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

      <DetailModal
        openModal={isOpenDetailModal}
        address={selectedFeedback?.email_telp}
        onClose={() => setIsOpenDetailModal(false)}
        title={selectedFeedback?.name}
        date={selectedFeedback?.CreatedAt}
        desc={selectedFeedback?.message}
      />
    </div>
  );
};

const FeedbackData = ({
  data,
  isLoading,
  search,
  handleOpenDeleteModal,
  onView,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {isLoading ? (
        <SkletonCardFeedback count={2} />
      ) : data?.length > 0 ? (
        data?.map((fd) => (
          <CardFeedback
            key={fd?.ID}
            name={fd?.name}
            address={fd?.email_telp}
            date={fd?.CreatedAt}
            message={fd?.message}
            onDelete={() => handleOpenDeleteModal(fd?.ID)}
            onView={() => onView(fd)}
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
