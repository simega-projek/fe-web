import { Badge } from "flowbite-react";
import parse from "html-react-parser";
import formattedDate from "../../../utils/formattedDate";
import TitleSection from "../../Elements/TitleSection";
import { SiGooglemaps } from "react-icons/si";
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
  } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div className="flex flex-col break-words">
      {/* image */}
      <div className={`mt-5 ${classImage}`}>
        <img
          src={img}
          alt={title}
          className="w-full object-cover object-center"
        />
      </div>

      {/* date and maps */}
      <div className="flex justify-between">
        <span className="italic">{dateFormatted} </span>
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
      {linkEvent && (
        <div className="mb-2 mt-5 break-words italic">
          Cek Link Kegiatan &rarr;{" "}
          <a href={linkEvent} className="text-blue-500" target="_blank">
            {" "}
            {linkEvent}{" "}
          </a>
        </div>
      )}
      {file && (
        <a
          href={file}
          target="_blank"
          className="mb-2 mt-5 italic text-blue-500"
        >
          Lihat dokumen{" "}
        </a>
      )}

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
    </div>
  );
};
