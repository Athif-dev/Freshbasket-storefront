import React, { Suspense } from "react";
import ProductFilters from "../components/Products/productFilters/ProductFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductGrid from "../components/Products/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="flex mt-3 container h-100vh">
      <div className="w-1/5 hidden md:block">
        {/* Product Filters Sidebar */}
        <ProductFilters />
      </div>
      <div className="flex-1">
        {/* Suspense to show a loading spinner until ProductGrid data loads */}
        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
}
