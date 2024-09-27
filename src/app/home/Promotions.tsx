import React from "react";
import Image from "next/image";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

function Promotions() {
  return (
    <div className="container py-12 font-poppins">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-[url('/Assets/promotions-yellow-bg.svg')] bg-cover bg-center min-h-[22vh] lg:h-auto xl:h-[40vh] w-full">
          <div className="flex justify-between pl-5 sm:pl-10 pt-5 sm:pt-10">
            <div className="flex flex-col w-[50%]">
              <p className="bg-[#FFD480] w-max py-0.5 px-1.5 rounded text-white text-xs">
                Free delivery
              </p>
              <h2 className="text-lg sm:text-2xl text-custom-black font-medium my-3">
                Free delivery over $50{" "}
              </h2>
              <p className="text-xs sm:text-base text-[#838383] font-light ">
                Shop $50 product and get free delivery anywhre.
              </p>
              <button className="w-36 sm:w-44 py-1.5 sm:py-3.5 bg-main-green text-white text-sm mt-3 sm:mt-12">
                Shop Now <ArrowForwardOutlinedIcon />
              </button>
            </div>
            <div className="w-[50%]">
              <Image
                src="/Assets/deliveryguy.svg"
                width={120}
                height={120}
                className="object-contain lg:ml-3 xl:ml-10 sm:w-[272px] sm:h-[272px]"
                alt="guy"
              />
            </div>
          </div>
        </div>
        <div className="bg-[url('/Assets/hero-bg.png')] bg-cover bg-center h-auto lg:h-auto xl:h-[40vh] w-full">
          <div className="flex justify-between pl-5 sm:pl-10 pt-5 sm:pt-10">
            <div className="flex flex-col w-[50%]">
              <p className="bg-main-green w-max py-0.5 px-1.5 rounded text-white text-xs">
                60% off
              </p>
              <h2 className="text-lg sm:text-2xl text-custom-black font-medium my-3">
                Organic Food
              </h2>
              <p className="text-xs sm:text-base text-[#838383] font-light ">
                Save up to 60% off on your first order
              </p>
              <button className="w-36 sm:w-44 py-1.5 sm:py-3.5 bg-main-green text-white text-sm mt-3 sm:mt-12">
                Order Now <ArrowForwardOutlinedIcon />
              </button>
            </div>
            <div className="w-[50%] flex items-end justify-end">
              <Image
                src="/Assets/Promotion-banner2.svg"
                width={170}
                height={170}
                className="object-contain  sm:w-[281px] sm:h-[281px]"
                alt="guy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotions;
