import TitleSection from "../../Elements/TitleSection";

export const Detail = (props) => {
    const {
        title,
        img = "/images/hero-img.png",
        date,
        desc,
    } = props;

    return (
        <div className="flex flex-col">
            <TitleSection>{title}</TitleSection>
            <span className="mt-5 mb-2">{date} </span>
            <div className="max-w-2xl md:max-w-xs">

                <img src={img} alt={title} className="w-full h-full object-cover object-center" />
            </div>
            <p className="mt-5 text-lg md:text-xl">{desc}</p>

        </div>
    );
};