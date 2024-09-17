import { formatDate } from "../../../utils/formatDate";
import formattedDate from "../../../utils/formattedDate";
import TitleSection from "../../Elements/TitleSection";
import parse from "html-react-parser";

export const Detail = (props) => {
  const { title, img = "/images/hero-img.png", date, desc } = props;

  const dateFormatted = formattedDate(date);

  return (
    <div className="flex flex-col">
      <TitleSection>{title}</TitleSection>
      <span className="mb-2 mt-5">{dateFormatted} </span>
      <div className="max-w-2xl md:max-w-md">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="mt-5 text-lg md:text-xl"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></div>
    </div>
  );
};
