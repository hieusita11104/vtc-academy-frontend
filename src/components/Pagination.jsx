import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePrevious,
  handleNext,
  indexOfFirstPatient,
  indexOfLastPatient,
  filteredPatients,
  getPageNumbers,
}) => {
  return (
    <div className="pagination">
      <span>
        Showing {indexOfFirstPatient + 1} to{" "}
        {Math.min(indexOfLastPatient, filteredPatients.length)} of{" "}
        {filteredPatients.length} entries
      </span>

      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;