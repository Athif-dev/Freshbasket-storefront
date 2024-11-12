import React, { lazy } from "react";
import { getProducts } from "../../lib/action";

import LoadingSpinner from "../LoadingSpinner";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = lazy(() => import("./ProductCard"));

const ProductGrid = async () => {
  const products = await getProducts();
  if (!products) {
    return <LoadingSpinner />;
  }

  const maxStars = 5;

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
        {/* <div className="fixed top-[3.5rem] bg-white h-[100vh] z-40 px-5">
          <button className="pt-4">
            <CloseIcon />
          </button>
          <ProductFilters onFilterChange={(filters) => setFilters(filters)} />
        </div> */}

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-main-green bg-emerald-100 py-1 px-3 w-[6rem] rounded-full text-sm">
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
          {products.map((product) => (
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
};

export default ProductGrid;
