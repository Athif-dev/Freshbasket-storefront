"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilters from "../components/Products/productFilters/ProductFilters";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { searchProducts } from "../lib/action";
import ProductCard from "../components/Products/ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  variants: { prices: { amount: number }[] }[];
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!q) return;

      setLoading(true);
      try {
        const response = await searchProducts(q);
        console.log(response);

        if (response && Array.isArray(response)) {
          setResults(response);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  return (
    <div className="flex mt-3 container h-100vh">
      <div className="w-1/5 hidden md:block">
        {/* Product Filters Sidebar */}
        <ProductFilters />
      </div>
      <div className="flex-1">
        <div className="h-[100vh] sm:mt-[8.6rem] hidden md:block font-poppins">
          <div className="flex items-center justify-end px-5">
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
          <h1 className="text-sm font-normal mb-4">
            <strong>{results?.length}</strong> results for "{q}"
          </h1>
          {loading && <p>Loading...</p>}

          {results.length > 0 ? (
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-7 py-8 px-5 justify-items-stretch">
              {results.map((product) => (
                <ProductCard i={product.id} product={product} maxStars={4} />
              ))}
            </div>
          ) : null}
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
          <h1 className="text-sm mt-4">
            <strong>{results?.length}</strong> results for "{q}"
          </h1>
          {/* Cards */}
          <div className="py-[0.8rem]">
            {results.map((product) => (
              <ProductCard i={product.id} product={product} maxStars={4} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
