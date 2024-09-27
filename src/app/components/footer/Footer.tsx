import React from "react";
import Image from "next/image";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

function Footer() {
  return (
    <div className="container h-80">
      <hr className="w-full border border-gray-200 my-5" />

      <div className="md:grid grid-flow-col mt-16">
        <div>
          <div className="hidden md:flex items-center gap-1">
            <Image src="/Assets/Logo.svg" alt="logo" width={45} height={45} />
            <div>
              <h2 className="text-main-green font-semibold">FreshBasket</h2>
              <h2 className="text-gray-300 text-sm">Grocery</h2>
            </div>
          </div>
          <div className="flex gap-1 mt-10">
            <FmdGoodOutlinedIcon className="text-main-green" />
            <p className="text-sm text-custom-black">
              Address: 1762 School House Road
            </p>
          </div>
          <div className="flex gap-1 mt-4">
            <LocalPhoneOutlinedIcon className="text-main-green" />
            <p className="text-sm text-custom-black">Call Us: 1233-777 </p>
          </div>
          <div className="flex gap-1 mt-4">
            <EmailOutlinedIcon className="text-main-green" />
            <p className="text-sm text-custom-black">
              Email: groceyish@contact.com
            </p>
          </div>
          <div className="flex gap-1 mt-4">
            <AccessTimeOutlinedIcon className="text-main-green" />
            <p className="text-sm text-custom-black">
              Work hours: 8:00 - 20:00, Sunday - Thursday
            </p>
          </div>
        </div>

        <div className="text-custom-black mt-7 md:mt-0">
          <h2 className=" font-medium text-xl">Account</h2>
          <p className="mt-5 text-[0.9rem] cursor-pointer">Wishlist</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Cart</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Track Order</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Shipping Details</p>
        </div>

        <div className="text-custom-black mt-7 md:mt-0">
          <h2 className=" font-medium text-xl">Useful links</h2>
          <p className="mt-5 text-[0.9rem] cursor-pointer">About Us</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Contact</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Hot deals</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Promotions</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">New products</p>
        </div>

        <div className="text-custom-black mt-7 md:mt-0">
          <h2 className=" font-medium text-xl">Help Center</h2>
          <p className="mt-5 text-[0.9rem] cursor-pointer">Payments</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Refund</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Checkout</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Shipping</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Q&A</p>
          <p className="my-2 text-[0.9rem] cursor-pointer">Privacy Policy</p>
        </div>
      </div>

      <hr className="w-full border border-gray-200 mt-7" />

      <div className="flex justify-between items-center py-5">
        <p className="text-gray-400 text-sm font-light">
          © 2024, All rights reserved
        </p>
        <Image
          src="/Assets/paymentIcons.svg"
          alt="payment icon"
          className="hidden md:block w-full max-w-[160px] md:max-w-[120px] lg:max-w-[160px]"
          width={160}
          height={160}
        />
        <div className="flex gap-2">
          <Image
            src="/Assets/fbIcon.svg"
            alt="payment icon"
            className="cursor-pointer w-full max-w-[30px] sm:max-w-[30px] md:max-w-[35px] lg:max-w-[40px]"
            width={40}
            height={40}
          />
          <Image
            src="/Assets/linkedinIcon.svg"
            alt="payment icon"
            className="cursor-pointer w-full max-w-[30px] sm:max-w-[30px] md:max-w-[35px] lg:max-w-[40px]"
            width={40}
            height={40}
          />
          <Image
            src="/Assets/InstaIcon.svg"
            alt="payment icon"
            className="cursor-pointer w-full max-w-[30px] sm:max-w-[30px] md:max-w-[35px] lg:max-w-[40px]"
            width={40}
            height={40}
          />
          <Image
            src="/Assets/XIcon.svg"
            alt="payment icon"
            className="cursor-pointer w-full max-w-[30px] sm:max-w-[30px] md:max-w-[35px] lg:max-w-[40px]"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
