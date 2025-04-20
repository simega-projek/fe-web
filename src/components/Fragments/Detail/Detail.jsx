import parse from "html-react-parser";
import formattedDate from "../../../utils/formattedDate";
import TitleSection from "../../Elements/TitleSection";
import { DetailList } from "./DetailList";

export const Detail = (props) => {
  const {
    title,
    img = "/images/hero-img.png",
    date,
    desc,
    status,
    file,
    linkEvent,
    category,
    site,
    valley,
    lintang,
    bujur,
    detailList = false,
    classImage,
    start_date,
    end_date,
  } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div className="flex flex-col break-words">
      {/* status */}
      {status && (
        <span
          className={`w-fit rounded-full px-2.5 py-0.5 text-base font-medium capitalize ${status === "Akan Datang" || status === "public" ? "bg-green-100 text-green-800" : status === "Proses" || status === "private" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
        >
          Status : {status}
        </span>
      )}

      {/* image */}

      <div className={`mt-5 ${classImage}`}>
        <img
          src={img}
          alt={title}
          className="w-full object-cover object-center"
        />
      </div>

      {/* date and maps */}
      <div className="mb-5 mt-1 flex justify-between">
        <span className="italic">{dateFormatted} </span>
      </div>

      {/* detail list */}
      {detailList && (
        <DetailList
          start_date={start_date}
          end_date={end_date}
          file={file}
          title={title}
          category={category}
          valley={valley}
          site={site}
          lintang={lintang}
          bujur={bujur}
          status={status}
          link_event={linkEvent}
        />
      )}

      <div className="px-1">
        {/* title */}
        <div className="mt-5 flex flex-col">
          <TitleSection>{title}</TitleSection>
        </div>

        {/* link */}
        {!detailList && linkEvent && (
          <div className="mb-2 mt-5 break-words italic">
            Cek Link Kegiatan &rarr;{" "}
            <a
              href={linkEvent}
              className="italic text-blue-500 underline"
              target="_blank"
            >
              {" "}
              {linkEvent}{" "}
            </a>
          </div>
        )}

        {/* file dokumen */}
        {!detailList && file && (
          <div className="mb-2 mt-5 break-words">
            Dokumen terlampir :{" "}
            <a
              href={file}
              target="_blank"
              className="italic text-blue-500 underline"
            >
              {file ? "Lihat dokumen" : "-"}
            </a>
          </div>
        )}

        {/* description */}
        <div className="mt-5 break-words text-lg md:text-xl">
          {parse(String(desc))}{" "}
          asdasdasdasdadsasddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        </div>

        {/* category */}
        {category && site && valley ? (
          <div className="mt-5 flex gap-2">
            <p>#{category} </p>
            <p>#{valley}</p>
            <p>#{site}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
