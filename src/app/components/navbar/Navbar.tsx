"use client";
import React, { useState } from "react";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Transition } from "@headlessui/react";

import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";
import Link from "next/link";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <>
      <div className="fixed hidden sm:block top-0 left-0 w-full bg-white/30 backdrop-blur-3xl shadow-lg z-50">
        <div className=" container flex py-4 items-center justify-between">
          <Link href="/home">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src="/Assets/Logo.svg" alt="logo" width={40} height={40} />
              <div>
                <h2 className="text-main-green font-medium">FreshBasket</h2>
                <h2 className="text-gray-300 text-sm">Grocery</h2>
              </div>
            </div>
          </Link>
          <div className="min-w-[400px] flex">
            <input
              placeholder="search for items.."
              className="bg-[#F3F3F3] pl-2 h-10 w-full text-sm"
            />
            <button className="bg-main-green text-white p-y-1.5 px-3 ">
              <SearchIcon />
            </button>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex items-center gap-2 cursor-pointer">
              <Badge badgeContent={1} color="success">
                <FavoriteBorderIcon className="text-md text-custom-black" />
              </Badge>
              <h2 className="text-xs">Wishlist</h2>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Badge badgeContent={1} color="success">
                <ShoppingCartOutlinedIcon className="text-md text-custom-black" />
              </Badge>
              <Link href="/cart">
                <h2 className="text-xs">Cart</h2>
              </Link>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                alt="Dr Doom"
                src="/static/images/avatar/1.jpg"
                className=""
                sx={{ width: 32, height: 32 }}
              />
              <h2 className="text-sm">Dr. Doom</h2>
            </div>
          </div>
        </div>

        <hr className="bg-gray-300 w-full" />

        <div className="container flex justify-between py-3">
          <Link href="/products">
            <button className="flex items-center gap-2 p-1.5  text-sm bg-main-green text-white hover:bg-emerald-600 transition-all ease cursor-pointer">
              <GridViewIcon />
              Browse All Products
            </button>
          </Link>
          <div className="flex items-center justify-between min-w-[500px] text-sm list-none">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <CottageOutlinedIcon />
              <div className="underline-animate">
                <span>Home</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <WhatshotOutlinedIcon />
              <div className="underline-animate">
                <span>Hot Deals</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <PercentOutlinedIcon />
              <div className="underline-animate">
                <span>Promotions</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <CampaignOutlinedIcon />
              <div className="underline-animate">
                <span>New Products</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <LocalPhoneOutlinedIcon className="text-[1.2rem] text-main-green" />
            <h2 className="text-sm text-main-green font-medium cursor-pointer">
              1233-7777
            </h2>
            <p className="text-xs">24/7 support center</p>
          </div>
        </div>
      </div>

      {/* moblie navbar */}
      <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-lg z-50 font-poppins">
        <div className="container sm:hidden flex items-center justify-between h-14">
          <div className="flex gap-4 items-center">
            <HamburgerMenu />
            <div className="flex gap-0.5 items-center">
              <Image src="/Assets/Logo.svg" alt="logo" width={28} height={28} />
              <h2 className="text-main-green text-[0.95rem] font-medium">
                FreshBasket
              </h2>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <SearchIcon
              className="text-md text-custom-black cursor-pointer"
              onClick={toggleSearch}
            />
            <PermIdentityIcon className="text-md text-custom-black" />
            <Badge badgeContent={1} color="success">
              <ShoppingCartOutlinedIcon className="text-md text-custom-black" />
            </Badge>
          </div>
        </div>

        {/* Dropdown Search Bar with Smooth Animation */}
        <Transition
          show={isSearchOpen}
          enter="transition ease-out duration-500"
          enterFrom="transform opacity-0 -translate-y-5"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-500"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 -translate-y-5"
        >
          <div className="container sm:hidden py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300"
            />
          </div>
        </Transition>
      </div>
    </>
  );
}

export default Navbar;
