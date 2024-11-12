"use client";
import React, { useEffect, useState } from "react";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import PricingSlider from "./PricingSlider";
import { getCategories } from "@/app/lib/action";

function ProductFilters({ onFilterChange }) {
  // const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const brands = [
    { name: "Dr.foods" },
    { name: "Saffola" },
    { name: "FreshCut" },
    { name: "Lipton" },
  ];

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getCategories();
  //       setCategories(response.product_categories);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const handleBrandChange = (brand) => (event) => {
    const newSelectedBrands = event.target.checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    setSelectedBrands(newSelectedBrands);
    onFilterChange({ selectedBrands: newSelectedBrands, priceRange });
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
    onFilterChange({ selectedBrands, priceRange: newValue });
  };

  return (
    <div className="min-w-[40%] sm:mt-[8.6rem] font-poppins">
      <div className="hidden xl:flex gap-2 items-center text-main-green">
        <TuneOutlinedIcon />
        <h2>Filters</h2>
      </div>
      <div className="mt-7">
        <h2 className="text-lg font-medium my-3">Categories</h2>
        {/* {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center list-none py-1"
          >
            <li className="text-sm font-light cursor-pointer">
              {category.name}
            </li>
            <p className="text-main-green bg-emerald-50 px-1 text-xs rounded">
              0
            </p>
          </div>
        ))} */}
      </div>
      <div className="mt-7">
        <h2 className="text-lg font-medium my-3">Brands</h2>
        {brands.map((brand) => (
          <div key={brand.name} className="font-light">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#3BB77E",
                    "&.Mui-checked": {
                      color: "#3BB77E",
                    },
                  }}
                  checked={selectedBrands.includes(brand.name)}
                  onChange={handleBrandChange(brand.name)}
                />
              }
              label={
                <p className="font-poppins font-light text-sm">{brand.name}</p>
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-7">
        <h2 className="text-lg font-medium my-3">Price</h2>
        <PricingSlider onPriceChange={handlePriceRangeChange} />
      </div>
      <div className="mt-11 flex gap-5">
        <button className="bg-main-green text-white w-[4.5rem] py-1 rounded">
          Apply
        </button>
        <button className="text-gray-400">Reset</button>
      </div>
    </div>
  );
}

export default ProductFilters;
