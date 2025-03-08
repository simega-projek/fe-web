import { Button, ButtonGroup } from "flowbite-react";

export const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const previous = "<";
  const next = ">";
  const firstPage = "<<";
  const lastPage = ">>";

  return (
    <ButtonGroup>
      <Button
        className="bg-light text-black hover:bg-primary"
        color={"primary"}
        onClick={() => onPageChange(1)} // Go to first page
        disabled={currentPage === 1}
      >
        {firstPage}
      </Button>
      <Button
        className="bg-light text-black hover:bg-primary"
        color={"primary"}
        onClick={() => onPageChange(currentPage - 1)} // Go to previous page
        disabled={currentPage === 1}
      >
        {previous}
      </Button>

      {new Array(totalPages).fill(1).map((_, index) => (
        <Button
          className="bg-light text-black hover:bg-primary"
          color={"primary"}
          key={index + 1}
          onClick={() => onPageChange(index + 1)} // Go to specific page
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        className="bg-light text-black hover:bg-primary"
        color={"primary"}
        onClick={() => onPageChange(currentPage + 1)} // Go to next page
        disabled={currentPage === totalPages}
      >
        {next}
      </Button>
      <Button
        className="bg-light text-black hover:bg-primary"
        color={"primary"}
        onClick={() => onPageChange(totalPages)} // Go to last page
        disabled={currentPage === totalPages}
      >
        {lastPage}
      </Button>
    </ButtonGroup>
  );
};

const PaginationLib = ({ itemsPerPage, onPageChange, totalPages }) => {
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setCurrentItems(itemsPerPage);
    setPageCount(totalPages);
  }, [itemsPerPage, totalPages]);

  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
    toView("top");
  };
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="mx-auto flex items-center justify-center w-full  text-xs p-5"
        breakLinkClassName="bg-tan p-3 text-white "
        pageLinkClassName="bg-light p-3  text-black hover:bg-tan hover:text-white"
        activeLinkClassName="bg-tan text-white"
        previousLinkClassName="bg-light text-primary p-3 hover:bg-tan hover:text-white rounded-l-full"
        nextLinkClassName="bg-light text-primary p-3 hover:bg-tan hover:text-white rounded-r-full"
      />
    </div>
  );
};
