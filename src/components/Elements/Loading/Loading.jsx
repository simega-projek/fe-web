import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="relative inset-0 bottom-0 top-0 flex items-center justify-center">
      <div className="m-auto flex flex-col items-center justify-center gap-2 rounded-md border-2 p-7 shadow-lg">
        <Spinner
          color={"gray"}
          aria-label="Extra large spinner example"
          size="xl"
        />
        <p className="mt-2 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
