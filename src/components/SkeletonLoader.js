import React from "react";

import "./SkeletonLoader.css";

const SkeletonLoader = ({ idx }) => {
  return <div className="skeleton-card" key={idx}></div>;
};

export default SkeletonLoader;
