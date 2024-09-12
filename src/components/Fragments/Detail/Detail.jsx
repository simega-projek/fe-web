import TitleSection from "../../Elements/TitleSection";

export const Detail = (props) => {
  const { title, img = "/images/hero-img.png", date, desc } = props;

  return (
    <div className="flex flex-col">
      <TitleSection>{title}</TitleSection>
      <span className="mb-2 mt-5">{date} </span>
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
