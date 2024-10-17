import React from "react";
import Image from "next/image";

import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Link from "next/link";

function ProductCard({ product, maxStars, i }) {
  function truncateHtml(html, maxLength) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let text = tmp.textContent || tmp.innerText || "";

    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + "...";
    }

    return text;
  }

  return (
    <div>
      {/* Pc Card */}
      <div className="hidden md:block">
        <div key={i} className="p-3 border-2 rounded-lg">
          <div className="flex items-center justify-center lg:w-[250px] lg:h-[200px] xl:w-[250px] xl:h-[200px]">
            <Image
              src={
                product.thumbnail ? product.thumbnail : "/Assets/product.svg"
              }
              width={500}
              height={500}
              alt="product"
              className="object-contain w-full h-full"
            />
          </div>

          <Link href={`/prodD/${product.id}`} passHref>
            <h2 className="text-[1rem] font-medium cursor-pointer">
              {product.title}
            </h2>
          </Link>
          <p
            className="text-xs mt-1 truncate"
            dangerouslySetInnerHTML={{
              __html: truncateHtml(product.description, 35),
            }}
          />
          <div className="flex items-center my-1.5">
            {Array.from({ length: maxStars }, (_, index) => (
              <StarRateRoundedIcon
                key={index}
                className={`text-[1.3rem] ${
                  index < 4 ? "text-custom-black" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-4 items-center justify-between mt-3">
            <div>
              <h3 className="text-[0.95rem] font-medium">
                {product.variants[0].prices[0].amount} $
              </h3>
              <h2 className="text-xs font-light text-gray-400">
                {product.variants[0].prices[0].amount} $
              </h2>
            </div>
            <div className="">
              <button className="bg-main-green text-white px-6 py-2 rounded-md font-medium text-sm cursor-pointer hover:bg-emerald-600 transition-all ease-in-out">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="flex sm:hidden items-center w-full py-5 border-b-2 ">
        <div className="flex items-center justify-center min-w-[150px] min-h-[100px] max-w-[150px] max-h-[100px] w-[150px] h-[100px]">
          <Image
            src={product.thumbnail ? product.thumbnail : "/Assets/product.svg"}
            width={80}
            height={80}
            alt="product"
            className="object-contain w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-[1rem] font-medium"> {product.title}</h2>
          <p
            className="text-xs mt-1"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="flex items-center my-1.5">
            {Array.from({ length: maxStars }, (_, index) => (
              <StarRateRoundedIcon
                key={index}
                className={`text-[1.3rem] ${
                  index < 4 ? "text-custom-black" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-20 justify-center mt-3">
            <div>
              <h3 className="text-[0.95rem] font-medium">
                {product.variants[0].prices[0].amount} $
              </h3>
              <h2 className="text-xs font-light text-gray-400">
                {product.variants[0].prices[0].amount} $
              </h2>
            </div>
            <div className="">
              <button className="bg-main-green text-white px-3.5 py-2 rounded-md font-medium text-xs">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
