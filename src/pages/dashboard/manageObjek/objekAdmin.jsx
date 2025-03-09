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

import { FaFileInvoice } from "react-icons/fa6";
import { GiStoneBust } from "react-icons/gi";

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { deleteObject, getAllObject } from "../../../services/object.service";
import { toView } from "../../../utils/toView";
import CreateObjek from "./CreateObjek";
import UpdateObjek from "./UpdateObjek";
import { AlertMessage } from "../../../components/Fragments/Alert/AlertMessage";
import { FilterPage } from "../../../components/Fragments/Filter/FilterPage";
import { PaginationPage } from "../../../components/Fragments/Paginator/PaginationPage";

export default function ObjekAdmin() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [objectData, setObjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const [filterObject, setFilterObject] = useState(null);
  const [filter, setFilter] = useState("");
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

  const fetchObject = async () => {
    setIsLoading(true);
    try {
      const objects = await getAllObject(
        contentPage,
        debouncedSearch,
        currentPage,
      );

      const sortedData = objects.data.sort(
        (a, b) => new Date(b.UpdateAt) - new Date(a.UpdateAt),
      );
      setObjectData(sortedData);
      setFilterObject(sortedData);
      setDataPage(objects.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (e) => {
    toView("top");
    setCurrentPage(e);
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const handleDeleteObject = async () => {
    const res = await deleteObject(selectedId);
    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      toView("top");
    } else {
      setMessageSuccess(res.message);
      setMessageError(null);
    }
    setIsOpenModalDelete(false);
    fetchObject();
  };

  const handleFilter = (e) => {
    const filterStatus = e.target.value;
    setFilter(filterStatus);
    if (filterStatus) {
      const filtered = objectData.filter(
        (item) => item.publish === e.target.value,
      );
      setFilterObject(filtered);
    } else {
      setFilterObject(objectData);
    }
  };

  // console.log(filterObject);

  useEffect(() => {
    fetchObject();
  }, [debouncedSearch, currentPage, contentPage]);

  // console.log({ selectedId });

  return (
    <>
      <CreateObjek
        isOpenCreate={isOpenCreateForm}
        onSuccess={fetchObject}
        onClose={handleOpenCreateForm}
      />

      <UpdateObjek
        isOpenUpdate={isOpenUpdateForm}
        id={selectedId}
        onSuccess={fetchObject}
        onClose={() => setIsOpenUpdateForm(false)}
      />

      {/* table data */}
      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiStoneBust /> Data Objek Megalit
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <FilterObject
            publish={filter}
            onPublish={handleFilter}
            search={search}
            onSearch={(e) => setSearch(e.target.value)}
          />
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
              <TableHeadCell className="w-2/5">Objek</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Status</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            {/* table data */}
            <TableData
              data={filterObject}
              isLoading={isLoading}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleOpenUpdateForm={handleOpenUpdateForm}
              searchData={search}
              startIndex={startIndex}
            />
          </Table>
        </div>
      </div>

      {isLoading ? null : (
        <PaginationPage
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
          onClick={handleDeleteObject}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}

const TableData = ({
  data,
  isLoading,
  startIndex,
  handleOpenDeleteModal,
  handleOpenUpdateForm,
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
        data?.map((objects, index) => (
          <TableRow key={objects.ID}>
            <TableCell className="whitespace-normal">
              {index + startIndex}
            </TableCell>
            <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
              {objects.nama_objek ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {objects.category.category ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              {objects.site.lembah.lembah ?? "-"}
            </TableCell>
            <TableCell className="whitespace-normal">
              <span
                class={`rounded-full px-2.5 py-0.5 text-sm font-medium ${objects.publish === "public" ? "bg-green-100 text-green-800" : objects.publish === "private" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              >
                {objects.publish ?? null}
              </span>
            </TableCell>
            <TableCell className="mx-auto items-center justify-center lg:flex">
              <ButtonControls
                name={"Detail"}
                icon={FaFileInvoice}
                to={`/objek/${objects.ID}/${objects.nama_objek}`}
              />
              <ButtonControls
                name={"Edit"}
                icon={FaEdit}
                onClick={() => handleOpenUpdateForm(objects.ID)}
              />
              <ButtonControls
                name={"Hapus"}
                icon={MdDeleteForever}
                onClick={() => handleOpenDeleteModal(objects.ID)}
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

const FilterObject = ({
  search,
  onSearch,
  site,
  onSite,
  publish,
  onPublish,
  valley,
  onValley,
}) => {
  const [valleyData, setValleyData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  // const fetchDataFilter = async () => {
  //   try {
  //     const valley = await getAllValley();
  //     const site = await getAllSite();

  //     const sortValley = valley.data.sort((a, b) => {
  //       return a.lembah.localeCompare(b.lembah);
  //     });

  //     const sortSite = site.data.sort((a, b) => {
  //       return a.nama_situs.localeCompare(b.nama_situs);
  //     });

  //     setValleyData(sortValley);

  //     setSiteData(sortSite);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataFilter();
  // }, []);
  return (
    <div className="flex w-full gap-2 md:w-3/4">
      <TextInput
        icon={FaSearch}
        placeholder="Cari Kegiatan..."
        onChange={onSearch}
        value={search}
        className="w-1/2"
      />

      {/* publish */}
      <Select value={publish} onChange={onPublish} className="w-1/4">
        <option value={""} className="bg-light">
          Status
        </option>
        <option value={"pending"}>Pending</option>
        <option value={"public"}>Publik</option>
        <option value={"private"}>Privat</option>
      </Select>

      {/* situs */}
      {/* <Select value={site} onChange={onSite} className="w-1/3">
        <option value={""} className="bg-light">
          Situs
        </option>

        {siteData?.map((s) => (
          <option value={s?.ID} key={s?.ID}>
            {s?.nama_situs}
          </option>
        ))}
      </Select> */}

      {/* lembah */}
      {/* <Select value={valley} onChange={onValley} className="w-1/3">
        <option value={""} className="bg-light">
          Lembah
        </option>

        {valleyData?.map((d) => (
          <option value={d?.ID} key={d?.ID}>
            {d?.lembah}
          </option>
        ))}
      </Select> */}
    </div>
  );
};
