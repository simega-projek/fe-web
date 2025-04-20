import ButtonLink from "../../Elements/Buttons/ButtonLink";

export const PopupMap = (props) => {
  const {
    id,
    img = "/images/hero-img.jpg",
    title,
    category,

    to,
  } = props;

  return (
    <>
      <div className="w-full">
        <div className="pt-2">
          <img src={img} alt={title} className="mx-auto max-h-40 rounded-md" />
        </div>

        <div>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Nama
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium capitalize text-gray-900">
              {title}
            </th>
          </tr>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Kategori
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {category}
            </th>
          </tr>
        </div>

        <ButtonLink
          to={to}
          classValue="bg-tan text-white transition-all duration-500 hover:bg-primary"
        >
          Lihat{" "}
        </ButtonLink>
      </div>
    </>
  );
};
