import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { searchProducts } from "@/app/lib/action";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  variants: [{ prices: [{ amount: number }] }];
  thumbnail: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>(searchTerm);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // Adjust the delay as needed (300ms is common)

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch results when debouncedTerm changes
  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedTerm) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await searchProducts(debouncedTerm);
        console.log(response);

        if (response && Array.isArray(response)) {
          setResults(response);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedTerm]);

  return (
    <>
      <div className="relative hidden sm:block">
        <div className=" min-w-[400px] xl:min-w-[550px] z-20 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="bg-[#F3F3F3] pl-2 h-10 w-full text-sm z-20"
          />
          <button className="bg-main-green text-white py-1.5 px-3 z-20">
            <SearchIcon />
          </button>
        </div>

        {loading && <p className="text-gray-500 mt-4">Loading...</p>}

        {/* Backdrop (Appears when there are results) */}
        {results.length > 0 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 h-[100vh] z-10"
            onClick={() => {
              setResults([]), setLoading(false);
            }} // Close the results on backdrop click
          ></div>
        )}
        {results?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 z-20 max-h-[650px] overflow-y-auto mt-4 hide-scrollbar">
            <div className="bg-white rounded">
              <p className="text-sm bg-gray-200 py-1 px-5 font-light">
                Showing results for <strong>"{searchTerm}"</strong>
              </p>
              <div className=" grid grid-cols-2 gap-5 p-5">
                {results?.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-300 px-4 py-3 flex flex-col gap-2 rounded"
                  >
                    <Image
                      src={
                        product.thumbnail
                          ? product.thumbnail
                          : "/Assets/product.svg"
                      }
                      alt={product.title}
                      className="object-contain m-auto"
                      width={160}
                      height={160}
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-medium cursor-pointer">
                        {product.title}
                      </h2>
                      <p
                        className="text-xs truncate max-w-[250px]"
                        dangerouslySetInnerHTML={{
                          __html:
                            product.description?.substring(0, 60) +
                            (product.description?.length > 150 ? "..." : ""),
                        }}
                      ></p>
                      <p className="text-sm font-medium">
                        ${product.variants[0].prices[0].amount}
                      </p>
                      <button className="text-sm bg-main-green text-white w-full py-1 mt-3 mb-3">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {results.length > 0 && (
                <Link
                  href={`/searchResults?q=${encodeURIComponent(
                    searchTerm
                  )}`}
                >
                  <p className="text-center text-sm text-gray-500 pb-2 cursor-pointer"                  
                   onClick={()=> setSearchTerm(searchTerm)}>

                    View all search results {">"}
                  </p>
                </Link>
              )}
              {!loading && results.length === 0 && searchTerm && (
                <p className="text-gray-500 mt-4">No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Search */}
      <div className="relative sm:hidden">
        <div className="container  py-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 sm:hidden"
          />
        </div>

        {results?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 z-20 max-h-[450px] overflow-y-auto hide-scrollbar">
            <div className="bg-white rounded">
              <p className="text-sm bg-gray-200 py-1 px-5 font-light">
                Showing results for <strong>"{searchTerm}"</strong>
              </p>
              <div className=" p-5">
                {results?.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-300 px-4 py-3 flex gap-5 rounded"
                  >
                    <Image
                      src={
                        product.thumbnail
                          ? product.thumbnail
                          : "/Assets/product.svg"
                      }
                      alt={product.title}
                      className="object-contain "
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-medium cursor-pointer">
                        {product.title}
                      </h2>
                      <p
                        className="text-xs truncate max-w-[250px]"
                        dangerouslySetInnerHTML={{
                          __html:
                            product.description?.substring(0, 60) +
                            (product.description?.length > 150 ? "..." : ""),
                        }}
                      ></p>
                      <p className="text-sm font-medium">
                        ${product.variants[0].prices[0].amount}
                      </p>
                      <button className="text-sm bg-main-green text-white w-full py-1 mt-3 mb-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {results.length > 1 ? (
                <p className="text-center text-sm text-gray-500 pb-2 cursor-pointer">
                  View all search results {">"}{" "}
                </p>
              ) : null}
              {!loading && results.length === 0 && searchTerm && (
                <p className="text-gray-500 mt-4">No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
