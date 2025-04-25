import React from "react";

import "./ProductCard.css";

const ProductCard = ({ key, title, description, thumbNail, price }) => {
  return (
    <div className="container" key={key}>
      <div className="title">{title}</div>

      <div className="thumbNail">
        <img src={thumbNail} alt="thumbNail" loading="lazy" />
      </div>

      <div className="others">
        <div className="description">{description}</div>
        <div className="price">₹{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
