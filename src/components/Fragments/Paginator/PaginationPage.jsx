import { Pagination } from "flowbite-react";
import { toView } from "../../../utils/toView";

export const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  // component utama
  // const onPageChange = (e) => {
  //   setCurrentPage(e);
  // };
  return (
    <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-baseline">
      <button
        onClick={() => {
          onPageChange(1) && toView("top");
        }}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
      >
        &lt;&lt;
      </button>

      <div className="flex sm:justify-center">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={onPageChange}
          previousLabel="<"
          nextLabel=">"
        />
      </div>

      <button
        onClick={() => onPageChange(totalPages) && toView("top")}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
      >
        &gt;&gt;
      </button>
    </div>
  );
};
