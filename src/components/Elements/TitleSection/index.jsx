export default function TitleSection(props) {
    const { children } = props;
    return (
        <h1 className="text-center text-2xl font-bold text-primary lg:text-3xl lg:mb-14">{children}</h1>
    );
}