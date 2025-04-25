import React from "react";

import "./SortingButtons.css";

const SortingButtons = ({ sortingOrder, setSortingOrder, handleSort }) => {
  return (
    <div className="sorting">
      <div
        onClick={() => {
          setSortingOrder("asc");
          handleSort("asc");
        }}
        className={sortingOrder === "asc" ? "active" : ""}
      >
        ASC ↑
      </div>
      <div
        onClick={() => {
          setSortingOrder("dsc");
          handleSort("dsc");
        }}
        className={sortingOrder === "dsc" ? "active" : ""}
      >
        DSC ↓
      </div>
    </div>
  );
};

export default SortingButtons;
