import { useParams } from "react-router-dom";

export default function SitusDetail() {
    const { id } = useParams();
    return (
        <>
            <div className="mt-20">
                pal pale {id}x
            </div>
        </>
    );
}