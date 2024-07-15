import { Spinner } from "flowbite-react";

export default function Loading() {
    return (
        <div className="relative top-0 bottom-0 inset-0 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2 w-20 p-20 h-20 border-2 rounded-md shadow-lg justify-center m-auto">

                <Spinner color={"warning"} aria-label="Extra large spinner example" size="xl" />
                <p className="text-light mt-2">Loading...</p>
            </div>
        </div>
    );
}