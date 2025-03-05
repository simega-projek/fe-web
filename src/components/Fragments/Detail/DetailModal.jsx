import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import parse from "html-react-parser";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
// import HTMLReactParser from "html-react-parser/lib/index";

export function DetailModal(props) {
  const {
    title,
    desc,
    img = "/images/hero-img.png",
    category,
    children,
    openModal = false,
    onClose,
    // handlePublish,
  } = props;
  //   const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal show={openModal} position={"center"} onClose={handleClose}>
        <ModalHeader>
          {"Detail Objek - " + title || "Detail Informasi"}
        </ModalHeader>
        <ModalBody className="scrollbar">
          <div className="space-y-6 p-6">
            <TitleSection>{title}</TitleSection>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {category ? "Kategori: " + category : ""}
            </p>
            <div className="mt-2 max-w-2xl md:max-w-md">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {parse(String(desc))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {children}

          <ButtonFunc className="bg-light" onClick={handleClose}>
            Tutup
          </ButtonFunc>
        </ModalFooter>
      </Modal>
    </>
  );
}
