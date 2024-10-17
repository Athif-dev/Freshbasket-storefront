"use client";
import Image from "next/image";
import React, { useState, useEffect, Suspense, lazy } from "react";
import ProductFilters from "../components/productFilters/ProductFilters";

import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { getProducts } from "../lib/action";
import LoadingSpinner from "../components/LoadingSpinner";
import { CircularProgress } from "@mui/material";
const ProductCard = lazy(() => import("../components/ProductCard"));

function ProductGrid() {
  const [isClicked, setIsclicked] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    selectedBrands: [],
    priceRange: [0, 100],
  });

  const toggleClick = () => {
    setIsclicked((prevState) => !prevState);
  };

  const maxStars = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  console.log(products);
  

  // Filter products based on filters
  const filteredProducts = products.filter((product) => {
    const price = product?.variants?.[0]?.prices?.[0]?.amount || 0;
    const matchesPrice =
      price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const matchesBrand =
      filters.selectedBrands.length === 0 ||
      filters.selectedBrands.includes(product.brand);
    return matchesPrice && matchesBrand;
  });

  return (
    <div className="h-[100vh] sm:mt-[8.6rem] font-poppins">
      {/* PC products */}
      <div className="hidden md:block">
        <div className="flex items-center px-5">
          <p className="text-xs text-gray-400">Sort by</p>
          <select className="text-sm text-custom-black w-[5.5rem] bg-transparent focus:outline-none">
            <option className="text-xs bg-transparent">Newest</option>
            <option className="text-xs bg-transparent">Featured</option>
            <option className="text-xs bg-transparent">
              Price high to low
            </option>
            <option className="text-xs bg-transparent">
              Price low to high
            </option>
          </select>
        </div>
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-7 py-8 px-5 justify-items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              maxStars={maxStars}
            />
          ))}
        </div>
      </div>

      {/* Mobile products */}
      <div className=" sm:hidden mt-14">
        {isClicked ? (
          <div className="fixed top-[3.5rem] bg-white h-[100vh] z-40 px-5">
            <button onClick={toggleClick} className="pt-4">
              <CloseIcon />
            </button>
            <ProductFilters onFilterChange={(filters) => setFilters(filters)} />
          </div>
        ) : null}
        <div className="flex justify-between items-center">
          <div
            onClick={toggleClick}
            className="flex gap-2 items-center text-main-green bg-emerald-100 py-1 px-3 w-[6rem] rounded-full text-sm"
          >
            <TuneOutlinedIcon className="text-xl" />
            <h2>Filters</h2>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-gray-400">Sort by</p>
            <select className="text-sm text-custom-black w-[5rem] bg-transparent focus:outline-none">
              <option className="text-xs bg-transparent">Newest</option>
              <option className="text-xs bg-transparent">Featured</option>
              <option className="text-xs bg-transparent">
                Price high to low
              </option>
              <option className="text-xs bg-transparent">
                Price low to high
              </option>
            </select>
          </div>
        </div>
        {/* Cards */}
        <div className="py-[0.8rem]">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              maxStars={maxStars}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
