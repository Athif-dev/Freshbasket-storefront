"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

function ExploreCategories() {
  const categoryData = [
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
    {
      imageUrl: "/Assets/vegetable.svg",
      name: "vegetable",
      itemsCount: 1,
    },
  ];

  const colors = [
    "#FFF3FF",
    "#FEEFEA",
    "#F2FCE4",
    "#ECFFEC",
    "#FFFCEB",
    "#DEF9EC",
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
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

  return (
    <>
      <div className="container py-7 font-poppins relative ease-in-out transition-all duration-20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium sm:my-4 sm:text-2xl">
            Explore Categories
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
        >
          {categoryData.map((category, index) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={index}
                style={{ backgroundColor: randomColor }}
                className="flex flex-col justify-center items-center h-44 w-[90%] cursor-pointer"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={80}
                  height={80}
                />
                <p className="text-md sm:text-sm text-[#253D4E]">
                  {category.name}
                </p>
                <p className="text-sm sm:text-xs text-[#ADADAD]">
                  {category.itemsCount === 1
                    ? `${category.itemsCount} Item`
                    : `${category.itemsCount} Items`}
                </p>
              </div>
            );
          })}
        </Carousel>
        <CustomRightArrow onClick={() => carouselRef.current?.next(1)} />
      </div>
    </>
  );
}

export default ExploreCategories;
