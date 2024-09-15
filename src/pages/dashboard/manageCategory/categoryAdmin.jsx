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
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
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
  const [fetchLoading, setFetchLoading] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchDebounce] = useDebounce(searchData, 1000);

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
    setFetchLoading(true);
    try {
      const category = await getAllCategory(100, searchDebounce);
      setCategoryData(category.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
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

  // console.log(categoryData);
  const handleSuccess = () => {
    fetchCategory();
  };

  useEffect(() => {
    fetchCategory();
  }, [searchDebounce]);

  return (
    <div>
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

      {/* table data */}
      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <BiLibrary /> Data Kategori
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Kategori..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
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
              <TableHeadCell className="w-1/2 text-center">
                Nama Kategori
              </TableHeadCell>

              <TableHeadCell className="w-1/5 text-center">
                Kontrol
              </TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {categoryData?.length > 0 &&
                categoryData?.map((category, index) => (
                  <TableRow key={category.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {category.category ?? "-"}
                    </TableCell>

                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdateForm(category.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(category.ID)}
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
          title={"menghapus data kategori"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteCategory}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </div>
  );
}
