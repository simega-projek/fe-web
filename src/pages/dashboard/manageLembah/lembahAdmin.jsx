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
import { FaEdit, FaSearch } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import TitleSection from "../../../components/Elements/TitleSection";
import { GiValley } from "react-icons/gi";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";
import { deleteValley, getAllValley } from "../../../services/valley.service";
import CreateObjek from "./CreateLembah";
import Loading from "../../../components/Elements/Loading/Loading";
import {
  getKabupaten,
  getKecamatan,
} from "../../../services/wilIndonesia.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { toView } from "../../../utils/toView";
import UpdateLembah from "./UpdateLembah";
import { useDebounce } from "use-debounce";

export default function LembahAdmin() {
  const [selectedId, setSelectedId] = useState(null);
  const [valleyData, setValleyData] = useState([]);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

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

  const fetchValley = async () => {
    try {
      const res = await getAllValley(200, debouncedSearch);
      // console.log(res);
      setValleyData(res.data);
    } catch (err) {
    } finally {
    }
  };

  const handleDeleteValley = async () => {
    const res = await deleteValley(selectedId);
    // console.log("delete = ", res);

    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      setIsOpenModalDelete(false);
      toView("top");
    } else {
      setMessageError(null);
      setMessageSuccess(res.message);
    }
    setIsOpenModalDelete(false);
    handleSuccess();
  };

  const handleSuccess = () => {
    fetchValley();
  };

  useEffect(() => {
    fetchValley();
  }, [debouncedSearch]);

  return (
    <>
      <CreateObjek
        isOpenCreate={isOpenCreateForm}
        onSuccess={handleSuccess}
        onClose={handleOpenCreateForm}
      />

      <UpdateLembah
        isOpenUpdate={isOpenUpdateForm}
        onSuccess={handleSuccess}
        id={selectedId}
        onClose={() => setIsOpenUpdateForm(false)}
      />

      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <GiValley /> Data Lembah
      </TitleSection>
      <hr />
      <div className="mt-5 w-full px-3">
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Lembah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Provinsi</TableHeadCell>
              <TableHeadCell className="w-1/5">Kabupaten</TableHeadCell>
              <TableHeadCell className="w-1/5">Kecamatan</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {valleyData?.length > 0 &&
                valleyData?.map((valley, index) => (
                  <TableRow key={valley?.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {valley?.lembah ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {valley?.provinsi ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {getDataByIndex(valley?.kabupaten_kota, 0) ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {getDataByIndex(valley?.kecamatan, 0) ?? "-"}
                    </TableCell>

                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdateForm(valley?.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(valley?.ID)}
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
          title={"menghapus data lembah"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteValley}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}
