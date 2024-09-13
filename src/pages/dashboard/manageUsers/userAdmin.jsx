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

import { FaEdit, FaSearch, FaUsers } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import {
  deleteAdmin,
  getAllAdmin,
  resetPassword,
} from "../../../services/superAdmin.service";
import CreateAdmin from "./CreateAdmin";
import { toView } from "../../../utils/toView";
import { setIsLoading } from "../../../redux/slices/authSlice";
import Loading from "../../../components/Elements/Loading/Loading";

export default function UserAdmin() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalReset, setIsOpenModalReset] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const handleOpenCreateForm = () => {
    setIsOpenCreate(!isOpenCreate);
  };
  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setIsOpenModalDelete(true);
  };

  const handleOpenResetModal = (id) => {
    setSelectedId(id);
    setIsOpenModalReset(true);
  };

  const fetchAdmin = async () => {
    setFetchLoading(true);
    try {
      const res = await getAllAdmin();
      setAdminData(res?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async () => {
    const res = await deleteAdmin(selectedId);
    console.log(res);
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
    toView("top");
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const res = await resetPassword(selectedId);
      if (res.error) {
        setMessageError(res.message);
        setMessageSuccess(null);
        setIsOpenModalReset(false);
        setIsOpenModalReset(false);
      } else {
        setMessageError(null);
        setMessageSuccess(res.message);
        setIsOpenModalReset(false);
      }
      handleSuccess();
      toView("top");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchAdmin();
  };
  useEffect(() => {
    fetchAdmin();
  }, []);

  // console.log({ isOpenModalDelete });
  // console.log(adminData);
  // console.log({ selectedId });
  return (
    <>
      <CreateAdmin isOpenCreate={isOpenCreate} onSuccess={handleSuccess} />

      {/* table data */}
      <hr className={`${isOpenCreate ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaUsers /> User Admin
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput icon={FaSearch} placeholder="Cari Akun Admin..." />
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
              <TableHeadCell className="w-2/5">Nama</TableHeadCell>
              <TableHeadCell className="w-1/5">Username</TableHeadCell>
              <TableHeadCell className="w-1/5">email</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {adminData?.length > 0 &&
                adminData?.map((admin, index) => (
                  <TableRow key={admin?.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {admin?.users?.fullname ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {admin?.username ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {admin?.users?.email ?? "-"}
                    </TableCell>

                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenResetModal(admin?.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(admin?.ID)}
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
          title={"menghapus akun admin"}
          isOpen={isOpenModalDelete}
          onClick={handleDelete}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}

      {isOpenModalReset && (
        <PopupConfirm
          title={"reset password"}
          isOpen={isOpenModalReset}
          onClick={handleResetPassword}
          onClose={() => setIsOpenModalReset(false)}
        />
      )}
    </>
  );
}
