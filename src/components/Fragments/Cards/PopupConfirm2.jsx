import { Button, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

export const PopupConfirm = ({
  title,
  isOpen,
  onClick = () => {},
  onClose,
}) => {
  return (
    <>
      <Modal show={isOpen} onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah anda yakin ingin {title} ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onClick}>
                {"Ya"}
              </Button>
              <Button color="gray" onClick={onClose}>
                Tidak
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
