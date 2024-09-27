// components/Layout.js
import React from "react";
import { Inter } from "next/font/google";
import ProductFilters from "../components/productFilters/ProductFilters";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex mt-3 container h-100vh`}>
      <div className="w-1/5 hidden md:block">
        <ProductFilters />
      </div>
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
}
