import { Badge } from "flowbite-react";
import parse from "html-react-parser";
import formattedDate from "../../../utils/formattedDate";
import TitleSection from "../../Elements/TitleSection";

export const Detail = (props) => {
  const {
    title,
    img = "/images/hero-img.png",
    date,
    desc,
    category,
    publish,
    file,
    linkEvent,
  } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <TitleSection>{title}</TitleSection>
        <Badge size={"xl"} color={"success"}>
          {publish}
        </Badge>
      </div>
      <div className="mt-5 max-w-2xl md:max-w-md">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <span className="mb-2 mt-5 italic">{dateFormatted} </span>
      {linkEvent ? (
        <p className="mb-2 mt-5 italic">
          Cek Link Kegiatan &rarr;{" "}
          <a href={linkEvent} className="text-blue-500" target="_blank">
            {" "}
            {linkEvent}{" "}
          </a>
        </p>
      ) : null}
      {file ? (
        <a
          href={file}
          target="_blank"
          className="mb-2 mt-5 italic text-blue-500"
        >
          Lihat dokumen{" "}
        </a>
      ) : null}

      <div
        className="break-words text-lg md:text-xl"
        // dangerouslySetInnerHTML={{ __html: desc }}
      >
        {/* {HTMLReactParser(desc)} */}
        {parse(String(desc))}
      </div>
    </div>
  );
};
