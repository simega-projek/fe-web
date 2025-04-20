import { formatDate } from "../../../utils/formatDate";
import { ButtonControls } from "../../Elements/Buttons/ButtonControls";
import { MdDeleteForever } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa6";
import parse from "html-react-parser";

export const SkletonCardFeedback = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="relative flex w-full flex-col rounded-lg border border-slate-200 bg-white/80 shadow-sm"
        >
          <div className="mx-3 mb-0 flex justify-between border-b border-slate-200 px-1 pb-2 pt-3">
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-gray-200"></div>
          </div>

          <div className="flex flex-grow flex-col">
            <div className="flex flex-grow flex-col gap-3 p-4">
              <p className="h-4 w-full animate-pulse rounded-full bg-gray-200"></p>
              <p className="h-4 w-full animate-pulse rounded-full bg-gray-200"></p>
              <p className="h-4 w-1/2 animate-pulse rounded-full bg-gray-200"></p>
            </div>
            <div className="mx-3 flex justify-between border-t border-slate-200 px-1 pb-3 pt-2">
              <span className="h-4 w-1/3 animate-pulse rounded-full bg-gray-200"></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
