import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../services/productService";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Loading from "../components/common/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "All Categories",
    priceRange: [0, 1000],
    sortBy: "name",
    searchTerm: searchParams.get("search") || "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>
            {filters.searchTerm
              ? `Search Results for "${filters.searchTerm}"`
              : "All Products"}
          </h1>
          <p>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="products-content">
          <aside className="products-sidebar">
            <ProductFilters
              selectedCategory={filters.category}
              onCategoryChange={(category) =>
                updateFilter("category", category)
              }
              priceRange={filters.priceRange}
              onPriceRangeChange={(range) => updateFilter("priceRange", range)}
              sortBy={filters.sortBy}
              onSortChange={(sort) => updateFilter("sortBy", sort)}
            />
          </aside>

          <main className="products-main">
            <ProductGrid products={filteredProducts} loading={false} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
