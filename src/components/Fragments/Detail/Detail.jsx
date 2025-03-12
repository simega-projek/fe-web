import { Badge } from "flowbite-react";
import parse from "html-react-parser";
import formattedDate from "../../../utils/formattedDate";
import TitleSection from "../../Elements/TitleSection";
import { SiGooglemaps } from "react-icons/si";

export const Detail = (props) => {
  const {
    title,
    img = "/images/hero-img.png",
    date,
    desc,
    publish,
    file,
    linkEvent,
    category,
    site,
    valley,
    lintang,
    bujur,
  } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div className="flex flex-col">
      <div className="mt-5">
        <img
          src={img}
          alt={title}
          className="w-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between">
        <span className="italic">{dateFormatted} </span>
        {lintang && bujur && (
          <a
            href={`https://www.google.com/maps/@${lintang},${bujur},15z`}
            target="_blank"
            className="rounded-full bg-[#008000] p-2"
          >
            <SiGooglemaps />
          </a>
        )}
      </div>

      <div className="flex flex-col">
        <TitleSection>{title}</TitleSection>
        <span
          className={`w-fit rounded-full px-2.5 py-0.5 text-sm font-medium ${publish === "public" || "Akan Datang" ? "bg-green-100 text-green-800" : publish === "Proses" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
        >
          {publish}
        </span>
      </div>
      {linkEvent && (
        <p className="mb-2 mt-5 italic">
          Cek Link Kegiatan &rarr;{" "}
          <a href={linkEvent} className="text-blue-500" target="_blank">
            {" "}
            {linkEvent}{" "}
          </a>
        </p>
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

      <div
        className="break-words text-lg md:text-xl"
        // dangerouslySetInnerHTML={{ __html: desc }}
      >
        {/* {HTMLReactParser(desc)} */}
        {parse(String(desc))}
      </div>

      {category && site && valley ? (
        <div className="mt-5 flex gap-2">
          <p>Kategori: {category} </p>
          <p>Lembah: {valley}</p>
          <p>Situs: {site}</p>
        </div>
      ) : null}
    </div>
  );
};
