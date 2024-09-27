import React from "react";
import Image from "next/image";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

function Tags() {
  const productData = [
    {
      category: "Vegetables",
      imageUrl: "/Assets/tagImg.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/tagImg.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
    {
      category: "Vegetables",
      imageUrl: "/Assets/tagImg.svg",
      name: "Redish 500g",
      reviewCount: 4,
      brand: "Mr.food",
    },
  ];
  const maxStars = 5;
  return (
    <div className="container hidden sm:grid grid-cols-4 lg:gap-5 xl:gap-32 my-20 font-poppins ">
      {/* /// 1  */}
      <div>
        <h2 className="text-xl font-medium sm:my-3 sm:text-2xl text-custom-black">
          Top Sells
        </h2>
        <div className="flex items-center">
          <hr className="border-main-green border-[1px] w-full rounded " />{" "}
          <hr className="border-gray-100 border w-full " />
        </div>

        {productData.map((product, index) => {
          return (
            <div className="flex gap-x-3 my-8">
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain "
                />
              </div>
              <div>
                <h2 className="font-medium text-custom-black text-base">
                  Orange
                </h2>
                <div className="flex items-center">
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
                <div className="flex items-center gap-1 mt-2">
                  <h2 className="text-main-green text-base">$40</h2>
                  <p className="text-[#ADADAD] text-xs font-normal">$50</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* /// 2  */}
      <div>
        <h2 className="text-xl font-medium sm:my-3 sm:text-2xl text-custom-black">
          Top Rated
        </h2>
        <div className="flex items-center">
          <hr className="border-main-green border-[1px] w-full rounded " />{" "}
          <hr className="border-gray-100 border w-full " />
        </div>

        {productData.map((product, index) => {
          return (
            <div className="flex gap-x-3 my-8">
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain "
                />
              </div>
              <div>
                <h2 className="font-medium text-custom-black text-base">
                  Orange
                </h2>
                <div className="flex items-center">
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
                <div className="flex items-center gap-1 mt-2">
                  <h2 className="text-main-green text-base">$40</h2>
                  <p className="text-[#ADADAD] text-xs font-normal">$50</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* /// 3  */}
      <div>
        <h2 className="text-xl font-medium sm:my-3 sm:text-2xl text-custom-black">
          Trending Items
        </h2>
        <div className="flex items-center">
          <hr className="border-main-green border-[1px] w-full rounded " />{" "}
          <hr className="border-gray-100 border w-full " />
        </div>

        {productData.map((product, index) => {
          return (
            <div className="flex gap-x-3 my-8">
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain "
                />
              </div>
              <div>
                <h2 className="font-medium text-custom-black text-base">
                  Orange
                </h2>
                <div className="flex items-center">
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
                <div className="flex items-center gap-1 mt-2">
                  <h2 className="text-main-green text-base">$40</h2>
                  <p className="text-[#ADADAD] text-xs font-normal">$50</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* /// 4  */}
      <div>
        <h2 className="text-xl font-medium sm:my-3 sm:text-2xl text-custom-black">
          Recently Added
        </h2>
        <div className="flex items-center">
          <hr className="border-main-green border-[1px] w-full rounded " />{" "}
          <hr className="border-gray-100 border w-full " />
        </div>

        {productData.map((product, index) => {
          return (
            <div className="flex gap-x-3 my-8">
              <div className="w-full sm:w-[140px] md:w-[180px] lg:w-[200px]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain w-full h-auto"
                />
              </div>

              <div>
                <h2 className="font-medium text-custom-black text-base">
                  Orange
                </h2>
                <div className="flex items-center">
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
                <div className="flex items-center gap-1 mt-2">
                  <h2 className="text-main-green text-base">$40</h2>
                  <p className="text-[#ADADAD] text-xs font-normal">$50</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tags;
