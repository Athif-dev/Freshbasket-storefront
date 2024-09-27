import React from "react";
import Image from "next/image";

function Benefits() {
  return (
    <div className="container md:flex items-center justify-between gap-32 mt-20 mb-10">
      <div className="flex items-center gap-3 my-12 md:my-0">
        <div>
          <Image
            src="/Assets/dealsIcon.svg"
            width={50}
            height={50}
            alt="deals-icon"
          />
        </div>
        <div>
          <h2>Best Prices & Deals</h2>
          <p className="text-gray-400 text-sm mt-1 font-light w-[90%] md:w-[70%]">
            Don’t miss our daily amazing deals and prices
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 my-12 md:my-0">
        <div>
          <Image
            src="/Assets/refundIcon.svg"
            width={50}
            height={50}
            alt="deals-icon"
          />
        </div>
        <div>
          <h2>Refundable</h2>
          <p className="text-gray-400 text-sm mt-1 font-light w-[90%] md:w-[70%]">
            If your items have damage we agree to refund it{" "}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 my-12 md:my-0">
        <div>
          <Image
            src="/Assets/deliveryIcon.svg"
            width={50}
            height={50}
            alt="deals-icon"
          />
        </div>
        <div>
          <h2>Free Delivery</h2>
          <p className="text-gray-400 text-sm mt-1 font-light w-[90%] md:w-[70%]">
            Do purchase over $50 and get free delivery anywhere
          </p>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
