import maxWord from "../../../utils/maxWord";
import ButtonLink from "../../Elements/Buttons/ButtonLink";

export const PopupMap = (props) => {
  const {
    id,
    img = "/images/hero-img.png",
    titleSitus,
    titleObject,
    desc = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam maxime beatae eos, ipsum ut culpa vitae repudiandae temporibus nostrum deleniti omnis ipsam, dolore esse, doloribus quisquam accusamus provident aliquid dicta! Odio pariatur ex dolorum consectetur error nisi reiciendis repellat repellendus, nihil quas atque cumque totam. Ut architecto distinctio placeat quod.",
  } = props;

  return (
    <>
      <div className="w-full">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {titleObject}
        </h3>
        <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
          {titleSitus}
        </h3>

        <div className="pt-2">
          <img
            src={img}
            alt={titleObject}
            className="mx-auto max-h-40 rounded-md"
          />
          <p className="px-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            {maxWord(desc, 20)}
          </p>
        </div>

        <ButtonLink
          to={`/objek/${id}/${titleObject}`}
          className="bg-tan text-white"
        >
          Lihat{" "}
        </ButtonLink>
      </div>
    </>
  );
};
