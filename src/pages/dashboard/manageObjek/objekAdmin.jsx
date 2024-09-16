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

import { FaFileInvoice } from "react-icons/fa6";
import { GiStoneBust } from "react-icons/gi";

import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { deleteObject, getAllObject } from "../../../services/object.service";
import CreateObjek from "./CreateObjek";
import { useDebounce } from "use-debounce";
import Loading from "../../../components/Elements/Loading/Loading";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { toView } from "../../../utils/toView";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import UpdateActivity from "../manageActivities/UpdateActivity";
import UpdateObjek from "./UpdateObjek";

export default function ObjekAdmin() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [objectData, setObjectData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
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
    try {
      const objects = await getAllObject(200, debouncedSearch);
      setObjectData(objects.data);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    fetchObject();
  }, [debouncedSearch]);

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
          <div className="w-full lg:w-1/3">
            <TextInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={FaSearch}
              placeholder="Cari berdasarkan Objek dan kategori..."
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
              <TableHeadCell className="w-2/5">Objek</TableHeadCell>
              <TableHeadCell className="w-1/5">Kategori</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {objectData?.length > 0 &&
                objectData?.map((objects, index) => (
                  <TableRow key={objects.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
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
                      {objects.site.nama_situs ?? "-"}
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaFileInvoice}
                        to={`/objek/${objects.ID}/${objects.nama_objek}`}
                      />
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdateForm(objects.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(objects.ID)}
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
          onClick={handleDeleteObject}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}
