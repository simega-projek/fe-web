import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import parse from "html-react-parser";

import { ButtonFunc } from "../../../components/Elements/Buttons/ButtonFunc";
import TitleSection from "../../../components/Elements/TitleSection";
import { DetailList } from "./DetailList";
import formattedDate from "../../../utils/formattedDate";
// import HTMLReactParser from "html-react-parser/lib/index";
import { SiGooglemaps } from "react-icons/si";

export function DetailModal(props) {
  const {
    date = new Date(),
    title,
    desc,
    status,
    site,
    valley,
    lintang,
    bujur,
    img,
    category,
    children,
    openModal = false,
    onClose,
    detailList = false,
    address,
    // handlePublish,
  } = props;
  //   const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const dateFormatted = formattedDate(date);

  return (
    <>
      <Modal
        show={openModal}
        position={"center"}
        onClose={handleClose}
        className="break-words"
      >
        <ModalHeader style={{ wordBreak: "break-word" }}>
          {"Detail Objek - " + title || "Detail Informasi"}
        </ModalHeader>
        <ModalBody className="scrollbar">
          {/* <div className="space-y-6 p-6">
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
            </div> */}

          <div className={`mt-5`}>
            {img && (
              <img
                src={img}
                alt={title}
                className="w-full object-cover object-center"
              />
            )}
          </div>

          {/* date and maps */}
          <div className="flex justify-between">
            <span
              className="break-words italic"
              style={{ wordBreak: "break-word" }}
            >
              {dateFormatted} {address && ` | ${address}`}
            </span>
            {lintang && bujur && (
              <a
                href={`https://www.google.com/maps/@${lintang},${bujur},15z`}
                target="_blank"
                className="rounded-full bg-[#008000] p-2 text-white"
              >
                <SiGooglemaps />
              </a>
            )}
          </div>

          {/* detail list */}

          {detailList && (
            <DetailList
              title={title}
              category={category}
              valley={valley}
              site={site}
              lintang={lintang}
              bujur={bujur}
              status={status}
            />
          )}

          {/* title */}
          <div className="mt-5 flex flex-col">
            <TitleSection>{title}</TitleSection>
          </div>

          {/* description */}
          <div
            className="mt-5 break-words text-lg md:text-xl"
            // dangerouslySetInnerHTML={{ __html: desc }}
          >
            {/* {HTMLReactParser(desc)} */}
            {parse(String(desc))}
          </div>

          {/* category */}
          {category && site && valley ? (
            <div className="mt-5 flex gap-2">
              <p>#{category} </p>
              <p>#{valley}</p>
              <p>#{site}</p>
            </div>
          ) : null}
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
