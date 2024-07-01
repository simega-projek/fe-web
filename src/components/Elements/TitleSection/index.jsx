export default function TitleSection(props) {
    const { children } = props;
    return (
        <h1 className=" text-2xl font-bold text-primary lg:text-4xl lg:mb-14">{children}</h1>
    );
}