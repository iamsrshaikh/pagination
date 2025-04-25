import React from "react";

import "./Buttons.css";

const Buttons = ({
  handlePrevClick,
  handleNextClick,
  currentPage,
  noOfTotalPages,
}) => {
  return (
    <div className="buttons">
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <button
        onClick={handleNextClick}
        disabled={currentPage === noOfTotalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
