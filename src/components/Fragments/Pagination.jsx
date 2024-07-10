import React from 'react';

export const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(totalPages);
    const handlePreviousPage = () => setCurrentPage(currentPage - 1);
    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handleSetPage = (page) => setCurrentPage(page);

    const renderPageNumbers = () => {
        if (totalPages <= 3) {
            return pages.map(page => (
                <button
                    key={page}
                    onClick={() => handleSetPage(page)}
                    className={currentPage === page ? "active min-h-[38px]min - w - [38px] flex justify - center items - center bg - gray - 200 text - gray - 800 py - 2 px - 3 text - sm rounded - lg focus: outline - none focus: bg - gray - 300 disabled: opacity - 50 disabled: pointer - events - none dark: bg - neutral - 600 dark: text - white dark: focus: bg - neutral - 500" : ''}
                >
                    {page}
                </button>
            ));
        } else {
            const visiblePages = [];

            // Always show the first page
            visiblePages.push(1);

            // Add pages around the current page
            if (currentPage > 2) {
                visiblePages.push(currentPage - 1);
            }

            if (currentPage > 1 && currentPage < totalPages) {
                visiblePages.push(currentPage);
            }

            if (currentPage < totalPages - 1) {
                visiblePages.push(currentPage + 1);
            }

            // Add ellipsis if needed
            if (currentPage < totalPages - 2) {
                visiblePages.push('...');
            }

            // Always show the last page
            if (totalPages > 1) {
                visiblePages.push(totalPages);
            }

            return visiblePages.map((page, index) => {
                if (page === '...') {
                    return <span key={index}>...</span>;
                } else {
                    return (
                        <button
                            key={page}
                            onClick={() => handleSetPage(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    );
                }
            });
        }
    };

    return (
        <>
            <div className="pagination flex gap-3 justify-center">
                <button onClick={handleFirstPage} disabled={currentPage === 1}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>

                </button>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>

                </button>
                <span className='text-xl'>
                    {renderPageNumbers()}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>

                </button>
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>

                </button>
            </div>

            <nav className="flex items-center gap-x-1">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span aria-hidden="true" className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                    {renderPageNumbers()}


                </div>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                    <span aria-hidden="true" className="sr-only">Next</span>
                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
            </nav>

        </>
    );
};
