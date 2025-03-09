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
import TitleSection from "../../../components/Elements/TitleSection";
import { AiOutlineFolderView } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import CreateArticle from "./CreateArticle";
import {
  deleteArticle,
  getAllArticles,
} from "../../../services/article.service";
import { formatDate } from "../../../utils/formatDate";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import UpdateArticle from "./UpdateArticle";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import Loading from "../../../components/Elements/Loading/Loading";
import { toView } from "../../../utils/toView";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { useDebounce } from "use-debounce";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";

export default function ArticleAdmin() {
  const [selectedId, setSelectedId] = useState(null);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setisOpenUpdate] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [dataPage, setDataPage] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 1000);

  const [currentPage, setCurrentPage] = useState(1);
  const [contentPage, setContentPage] = useState(10);
  const startIndex = (currentPage - 1) * contentPage + 1;

  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
    setisOpenUpdate(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenUpdate = (id) => {
    setSelectedId(id);
    setisOpenUpdate(true);
    setIsOpenCreate(false);
    setMessageError(null);
    setMessageSuccess(null);
    toView("top");
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      const article = await getAllArticles(
        contentPage,
        debouncedSearch,
        currentPage,
      );

      const sortedData = article.data.sort(
        (a, b) => new Date(b.UpdateAt) - new Date(a.UpdateAt),
      );

      setArticleData(sortedData);
      setDataPage(article.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    const res = await deleteArticle(selectedId);
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
    handleSuccess();
  };

  const handleSuccess = () => {
    fetchArticle();
  };

  const onPageChange = (e) => {
    setCurrentPage(e);
    toView("top");
  };

  useEffect(() => {
    fetchArticle();
  }, [debouncedSearch, currentPage, contentPage]);

  // console.log(articleData);
  // console.log(fetchArticle);

  return (
    <>
      <CreateArticle
        isOpenCreate={isOpenCreate}
        onSuccess={handleSuccess}
        onClose={handleOpenCreateForm}
      />

      <UpdateArticle
        isOpenUpdate={isOpenUpdate}
        onSuccess={handleSuccess}
        id={selectedId}
        onClose={() => setisOpenUpdate(false)}
      />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <MdArticle /> Data Artikel & Berita
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Artikel & Berita..."
              className="w-full"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
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
        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Judul</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal</TableHeadCell>
              <TableHeadCell className="w-1/5">Gambar</TableHeadCell>
              <TableHeadCell className="w-1/5">File</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableData
              isLoading={isLoading}
              searchData={searchData}
              data={articleData}
              startIndex={startIndex}
              handleOpenUpdate={handleOpenUpdate}
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
        />
      )}

      {isOpenModalDelete && (
        <PopupConfirm
          title={"menghapus data artikel"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteArticle}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  data,
  startIndex,
  handleOpenUpdate,
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
        data?.map((article, index) => (
          <TableRow key={article.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex}
            </TableCell>
            <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
              {article.title ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {formatDate(article.CreatedAt) ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              <img src={article.image} alt={article.title} className="h-10" />
            </TableCell>
            <TableCell className="whitespace-normal">
              <a href={article.file} target="_blank" rel="noopener noreferrer">
                <AiOutlineFolderView />
              </a>
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                to={`/artikel/${article?.ID}/${article?.title}`}
              />
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdate(article.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(article.ID)}
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
