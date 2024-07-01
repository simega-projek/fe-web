export default function TitleSection(props) {
    const { children } = props;
    return (
        <h1 className=" text-2xl font-bold text-primary md:text-3xl lg:text-4xl ">{children}</h1>
    );
}