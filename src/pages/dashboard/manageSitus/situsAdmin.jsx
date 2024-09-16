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

import TitleSection from "../../../components/Elements/TitleSection";

import { FaEdit, FaSearch, FaSitemap } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ButtonControls } from "../../../components/Elements/Buttons/ButtonControls";

import { useEffect, useState } from "react";
import Loading from "../../../components/Elements/Loading/Loading";
import { FailAllert } from "../../../components/Fragments/Alert/FailAlert";
import { SuccessAlert } from "../../../components/Fragments/Alert/SuccessAlert";
import { PopupConfirm } from "../../../components/Fragments/Cards/PopupConfirm";
import { deleteSite, getAllSite } from "../../../services/site.service";
import { getDataByIndex } from "../../../utils/getDataByIndex";
import { toView } from "../../../utils/toView";
import CreateSitus from "./CreateSitus";
import UpdateSitus from "./UpdateSitus";
import { useDebounce } from "use-debounce";

export default function SitusAdmin() {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [messageError, setMessageError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [siteData, setSiteData] = useState("");

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

  const handleDeleteSite = async () => {
    const res = await deleteSite(selectedId);
    if (res.error) {
      setMessageError(res.message);
      setMessageSuccess(null);
      toView("top");
    } else {
      setMessageError(null);
      setMessageSuccess(res.message);
    }
    setIsOpenModalDelete(false);
    handleSuccess();
  };

  const fetchSite = async () => {
    setFetchLoading(true);
    try {
      const site = await getAllSite(200, debouncedSearch);
      setSiteData(site.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchSite();
  };

  useEffect(() => {
    fetchSite();
  }, [debouncedSearch]);

  // console.log(selectedId);
  return (
    <>
      <CreateSitus
        isOpenCreate={isOpenCreateForm}
        onSuccess={handleSuccess}
        onClose={handleOpenCreateForm}
      />
      <UpdateSitus
        isOpenUpdate={isOpenUpdateForm}
        onSuccess={handleSuccess}
        onClose={() => setIsOpenUpdateForm(false)}
        id={selectedId}
      />

      {/* table data */}
      <hr className={`${isOpenCreateForm ? "mt-10" : "mt-0"}`} />
      <TitleSection className="my-5 flex px-3 underline">
        <FaSitemap /> Data Situs
      </TitleSection>
      <hr />

      <div className="mt-5 w-full px-3">
        {/* search & button create */}
        <div className="flex justify-between">
          <div className="w-full lg:w-1/3">
            <TextInput
              icon={FaSearch}
              placeholder="Cari Situs..."
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

        {/* table */}
        <div className="mt-5 overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="w-1/12">No</TableHeadCell>
              <TableHeadCell className="w-2/5">Nama Situs</TableHeadCell>
              <TableHeadCell className="w-1/5">Lembah</TableHeadCell>
              <TableHeadCell className="w-1/5">Desa/Kelurahan</TableHeadCell>
              <TableHeadCell className="w-1/5">Kontrol</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {siteData?.length > 0 &&
                siteData?.map((site, index) => (
                  <TableRow key={site?.ID}>
                    <TableCell className="whitespace-normal">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                      {site?.nama_situs ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {site?.lembah.lembah ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {getDataByIndex(site?.desa_kelurahan, 0) ??
                        site?.desa_kelurahan ??
                        "-"}
                    </TableCell>
                    <TableCell className="mx-auto items-center justify-center lg:flex">
                      <ButtonControls
                        icon={FaEdit}
                        onClick={() => handleOpenUpdateForm(site?.ID)}
                      />
                      <ButtonControls
                        icon={MdDeleteForever}
                        onClick={() => handleOpenDeleteModal(site?.ID)}
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
          title={"menghapus data situs"}
          isOpen={isOpenModalDelete}
          onClick={handleDeleteSite}
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </>
  );
}
