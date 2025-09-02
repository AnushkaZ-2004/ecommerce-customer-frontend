import React from "react";
import { CATEGORIES } from "../../utils/constants";

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="product-filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <h4>Category</h4>
        <div className="category-filters">
          {CATEGORIES.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-filter">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
            }
            className="price-slider"
          />
          <div className="price-display">Up to ${priceRange[1]}</div>
        </div>
      </div>

      <div className="filter-group">
        <h4>Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
