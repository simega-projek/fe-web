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

export default function ArticleAdmin() {
  const [selectedId, setSelectedId] = useState(null);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setisOpenUpdate] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

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
      setFetchLoading(true);
      const article = await getAllArticles(50);
      setArticleData(article.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
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

  useEffect(() => {
    fetchArticle();
  }, []);

  // console.log(articleData);
  // console.log(fetchArticle);

  return (
    <>
      <CreateArticle isOpenCreate={isOpenCreate} onSuccess={handleSuccess} />

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
          <div className="w-full lg:w-1/3">
            <TextInput icon={FaSearch} placeholder="Cari Artikel & Berita..." />
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
              <TableHeadCell className="w-2/5">Judul</TableHeadCell>
              <TableHeadCell className="w-1/5">Tanggal</TableHeadCell>
              <TableHeadCell className="w-1/5">Gambar</TableHeadCell>
              <TableHeadCell className="w-1/5">File</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {articleData?.length > 0 &&
                articleData?.map((article, index) => (
                  <TableRow key={article.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {article.title ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {formatDate(article.CreatedAt) ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-10"
                      />
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <a
                        href={article.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiOutlineFolderView />
                      </a>
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaFileInvoice}
                        to={`/artikel/${article.ID}`}
                      />
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdate(article.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(article.ID)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {fetchLoading ? (
        <div className="mt-10">
          <Loading />
        </div>
      ) : null}

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
