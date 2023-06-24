import React, { useState, useEffect } from "react";
import style from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, handlePrevPage, handlePageChange, handleNextPage }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      const newPage = parseInt(inputPage);
      if (newPage >= 1 && newPage <= totalPages) {
        handlePageChange(newPage);
      } else {
        setInputPage(currentPage);
      }
    }
  };

  return (
    <div className={style.pagination}>
      <button className={style.buttonRight} onClick={handlePrevPage} disabled={currentPage === 1}>
        ◄
      </button>
      <input
        type="number"
        value={inputPage}
        min={1}
        max={totalPages}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className={style.input}
      />
      of {totalPages} pages 
      <button className={style.buttonLeft} onClick={handleNextPage} disabled={currentPage === totalPages}>
        ►
      </button>
    </div>
  );
};

export default Pagination;

