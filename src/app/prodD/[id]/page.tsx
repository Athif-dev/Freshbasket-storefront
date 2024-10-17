"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SimilarProducts from "./SimilarProducts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/app/lib/action";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface SelectedVariant {
  index: number | null;
  variantName: string | null;
}
interface Product {
  title: string;
  thumbnail: string;
  images: [{ url: string }];
  variants: [{ title: string; prices: [{ amount: number }] }];
  description: string;
}

function page() {
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail);
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    index: null,
    variantName: null,
  });

  const { id } = useParams();
  const productId = id;

  useEffect(() => {
    const fetchProductByID = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response);
        setSelectedImage(response.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductByID();
  }, [productId]);

  return (
    <div className="container mt-16 lg:mt-40 font-poppins">
      {product ? (
        <div>
          {/* short navbar */}
          <div className="hidden sm:flex items-center gap-1 text-custom-black ">
            <HomeOutlinedIcon />
            <p className="text-base font-sans font-normal">
              Home /
              <Link href={`/products`} passHref>
                <span> Products </span>
              </Link>
              / <span> Vegitables</span>
            </p>
          </div>
          {/* Product Images */}
          <div className="sm:flex w-full gap-10">
            <div className="flex flex-col-reverse xl:flex-row mt-3 gap-2">
              {/* Images */}
              <div>
                <div className="flex xl:flex-col gap-2 xl:justify-center">
                  {product.images.map((image) => (
                    <div
                      className="flex items-center justify-center w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] xl:w-[100px] xl:h-[80px] border rounded-sm cursor-pointer"
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full transform transition-transform duration-300 ease-in-out hover:scale-105"
                        alt="product-image"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <div className="flex items-center justify-center lg:w-[350px] lg:h-[300px] xl:w-[430px] xl:h-[430px] border rounded cursor-pointer">
                  <Image
                    src={selectedImage!}
                    width={500}
                    height={500}
                    className="object-contain w-full h-full"
                    alt="product-image"
                  />
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className="pt-5 xl:w-[35%]">
              <h2 className=" text-xl sm:text-2xl font-medium text-custom-black">
                {product.title}, {selectedVariant?.variantName}
              </h2>
              <p className="text-custom-black text-sm pb-2">
                by{" "}
                <span className="text-main-green cursor-pointer hover:underline">
                  Fresho
                </span>
              </p>
              <p className="text-gray-400 font-light line-through	 text-[0.92rem]">
                MRP: $ {product.variants[0].prices[0].amount + 7}
              </p>
              <p className="text-[0.95rem] font-medium">
                Price: $ {product.variants[0].prices[0].amount}
              </p>
              <div className="hidden sm:flex gap-4 items-center mt-5">
                <button className="py-2.5 px-[5.5rem] text-white bg-main-green text-base rounded">
                  Add to basket
                </button>
                <FavoriteBorderOutlinedIcon className="text-[1.9rem] text-custom-black cursor-pointer" />
              </div>

              {/* Product Variants */}
              <h2 className="mt-5 mb-2 text-[0.95rem] font-medium">
                Pack Sizes
              </h2>
              <div>
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedVariant({
                        index: index,
                        variantName: variant.title,
                      })
                    }
                    className={`flex items-center justify-between px-2 py-5 mb-3 border rounded cursor-pointer ${
                      selectedVariant.index === index
                        ? "border-main-green"
                        : "border-gray-400"
                    }`}
                  >
                    <p className="text-sm font-medium">{variant.title}</p>
                    <p className="text-sm font-medium">
                      $ {variant.prices[0].amount}
                      <span className="text-custom-black text-xs font-normal ">
                        ($ {variant.prices[0].amount} / {variant.title})
                      </span>{" "}
                    </p>
                    <DoneOutlinedIcon
                      className={`text-base text-main-green ${
                        selectedVariant.index === index
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="w-full border-dashed border-gray-400 my-10" />

          {/* Product Description */}
          <div>
            <h2 className="text-xl font-medium text-custom-black pb-3">
              {product.title}
            </h2>
            <div className="border border-gray-400 p-4 rounded-lg">
              <h4 className="text-base pb-3">About the product</h4>
              <p
                className="text-sm w-[90%]"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>
          </div>

          <div className="sticky bottom-0 mt-10 flex sm:hidden text-sm text-center text-white">
            <div className="flex justify-center items-center gap-2 bg-custom-black w-full py-4">
              <FavoriteBorderOutlinedIcon />
              <h4>Add to wishlist</h4>
            </div>
            <div className="flex justify-center items-center gap-2 bg-main-green w-full py-4">
              <ShoppingCartOutlinedIcon />
              <h4>Add to basket</h4>
            </div>
          </div>

          {/* Similar Products */}
          <div>
            <SimilarProducts />
          </div>

          {/* View All section */}
          <div className="sm:flex justify-around my-20 bg-gray-50 py-8">
            <div className="flex items-center justify-between sm:gap-4 bg-white mb-5 sm:mb-0 py-5 px-10">
              <ShoppingBagOutlinedIcon className=" text-main-green text-5xl sm:text-7xl" />
              <div>
                <p className=" text-sm sm:text-base py-2 sm:py-4 text-custom-black">
                  view more products from Category
                </p>
                <button className="bg-main-green px-3 py-1 sm:px-4 sm:py-1.5 mb-2 text-white text-xs sm:text-sm rounded">
                  View All
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between sm:gap-4 bg-white sm:mb-0 py-5 px-10">
              <BakeryDiningOutlinedIcon className=" text-main-green text-5xl sm:text-7xl" />
              <div>
                <p className=" text-sm sm:text-base py-2 sm:py-4 text-custom-black">
                  view more products from Fresho
                </p>
                <button className="bg-main-green px-3 py-1 sm:px-4 sm:py-1.5 mb-2 text-white text-xs sm:text-sm rounded">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default page;
