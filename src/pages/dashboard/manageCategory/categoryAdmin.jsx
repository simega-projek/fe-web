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

import { BiLibrary } from "react-icons/bi";

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";
import {
  deleteCategory,
  getAllCategory,
} from "../../../services/category.service";
import { toView } from "../../../utils/toView";
import CreateCategory from "./CreateCategory";
import UpdateCategories from "./UpdateCategory";

export default function CategoryAdmin() {
  const [selectedId, setSelectedId] = useState(null);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [dataPage, setDataPage] = useState(false);

  const [searchData, setSearchData] = useState("");
  const [debouncedSearch] = useDebounce(searchData, 1000);

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

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const category = await getAllCategory(
        contentPage,
        debouncedSearch,
        currentPage,
      );
      setCategoryData(category.data);
      setDataPage(category.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    const res = await deleteCategory(selectedId);

    if (res.err) {
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

  const onPageChange = (e) => {
    setCurrentPage(e);
    toView("top");
  };

  // console.log(contentPage);
  // console.log(categoryData);
  const handleSuccess = () => {
    fetchCategory();
  };

  useEffect(() => {
    fetchCategory();
  }, [debouncedSearch, currentPage, contentPage]);

  return (
    <div className="">
      <CreateCategory
        isOpenCreate={isOpenCreateForm}
        onClose={handleOpenCreateForm}
        onSuccess={handleSuccess}
      />
      <UpdateCategories
        isOpenUpdate={isOpenUpdateForm}
        onClose={() => setIsOpenUpdateForm(false)}
        onSuccess={handleSuccess}
        id={selectedId}
      />

      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <BiLibrary /> Data Kategori
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Kategori..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
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
          messageError={messageError}
          messageSuccess={messageSuccess}
          setMessageError={setMessageError}
          setMessageSuccess={setMessageSuccess}
        />

        {/* table data */}

        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-1/2 text-center">
                Nama Kategori
              </TableHeadCell>

              <TableHeadCell className="w-1/5 text-center">
                Kontrol
              </TableHeadCell>
            </TableHead>

            <TableData
              isLoading={isLoading}
              categoryData={categoryData}
              startIndex={startIndex}
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
          currentPage={currentPage}
          totalPages={dataPage?.totalPages}
          onPageChange={onPageChange}
          totalItems={dataPage?.totalItems}
        />
      )}

      {isOpenModalDelete && (
        <PopupConfirm
          title={"menghapus data kategori"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteCategory}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </div>
  );
}

const TableData = ({
  isLoading,
  categoryData,
  startIndex,
  searchData,
  handleOpenDeleteModal,
  handleOpenUpdateForm,
}) => {
  return (
    <TableBody className="divide-y">
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={3} className="text-center">
            <Loading />
          </TableCell>
        </TableRow>
      ) : categoryData?.length > 0 ? (
        categoryData?.map((category, index) => (
          <TableRow key={category.ID}>
            <TableCell className="whitespace-normal">
              {startIndex + index}
            </TableCell>
            <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
              {category.category ?? "-"}
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(category.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(category.ID)}
              />
            </TableCell>
          </TableRow>
        ))
      ) : (
        !isLoading && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-500">
              data {searchData} tidak ditemukan
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};
