"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
interface ArrowProps {
  onClick?: () => void;
}

// Custom Left Arrow Component
const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute hidden sm:block left-0 sm:left-20 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg focus:outline-none 0"
      aria-label="Previous Slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-custom-black hover:text-main-green ease-in-out transition-all duration-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

// Custom Right Arrow Component
const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute hidden sm:block right-0 sm:right-20 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg focus:outline-none"
      aria-label="Next Slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-custom-black hover:text-main-green ease-in-out transition-all duration-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

function FeaturedProducts() {
  const productData = [
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/product.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const carouselRef = useRef<Carousel>(null);
  const maxStars = 5;

  return (
    <>
      <div className="container py-7 font-poppins relative w-full ease-in-out transition-all duration-20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium sm:my-4 sm:text-2xl">
            Featured Products
          </h2>
          <div className="hidden sm:flex space-x-4">
            <button className="text-custom-black hover:text-main-green">
              All
            </button>
            <button className="text-custom-black">Vegetables</button>
          </div>
        </div>
      </div>

      <div className="relative container mb-12">
        <CustomLeftArrow onClick={() => carouselRef.current?.previous(1)} />
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite={false}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={false}
          arrows={false}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {productData.map((product, index) => {
            return (
              <div
                key={index}
                className="flex flex-col flex-grow justify-center pl-3 border rounded cursor-pointer"
              >
                <div className="py-5 m-auto">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-left text-[#ADADAD]">
                  {product.category}
                </p>
                <p className="text-base font-medium text-left text-[#253D4E]">
                  {product.name}
                </p>

                <div className="flex items-center my-1">
                  {Array.from({ length: maxStars }, (_, index) => (
                    <StarRateRoundedIcon
                      key={index}
                      className={`text-[1.2rem] ${
                        index < product.reviewCount
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <p className="text-xs text-left text-[#ADADAD]">
                    ({product.reviewCount})
                  </p>
                </div>
                <p className="text-xs text-left text-[#ADADAD]">
                  by{" "}
                  <span className="text-main-green text-[0.8rem] font-normal">
                    {product.brand}
                  </span>
                </p>
                <div className="flex justify-between items-center mt-4 mb-4">
                  <div className="flex items-center gap-1">
                    <h2 className="text-main-green text-base">$40</h2>
                    <p className="text-[#ADADAD] text-xs font-normal">$50</p>
                  </div>
                  <button className="flex items-center  gap-1 bg-[#DEF9EC] text-main-green text-sm font-normal py-1 px-5 mr-3">
                    <ShoppingCartOutlinedIcon className="text-base " />
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </Carousel>
        <CustomRightArrow onClick={() => carouselRef.current?.next(1)} />
      </div>
    </>
  );
}

export default FeaturedProducts;
