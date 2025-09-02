import React from "react";
import { CATEGORIES } from "../../utils/constants";

const CategoryList = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-list">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`category-item ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
