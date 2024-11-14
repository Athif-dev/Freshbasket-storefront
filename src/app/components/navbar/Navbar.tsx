"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/index";
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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { Transition } from "@headlessui/react";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Signin from "../Signin/Signin";
import { login, logout } from "@/app/lib/action";
import Cookies from "js-cookie";
import { loadUser } from "@/app/store/userSlice";
import SearchBar from "./Searchbar";

function Navbar() {
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showsignup, setShowsignup] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      setShowsignup(false);
    }
    const userCookie = Cookies.get("user");
    const tokenCookie = Cookies.get("token");

    if (userCookie && tokenCookie) {
      try {
        const user = JSON.parse(userCookie);
        // Dispatch loadUser action to set the user in the Redux store
        dispatch(
          loadUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          })
        );
      } catch (error) {
        console.error("Failed to parse userCookie:", error);
      }
    }
  }, [isUserAuthenticated]);

  const router = useRouter();
  const dispatch = useDispatch();

  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);

  const handleLogout = () => {
    logout(dispatch)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
      });
  };
  return (
    <>
      <div className="fixed hidden sm:block top-0 left-0 w-full bg-white/30 backdrop-blur-3xl shadow-lg z-20 font-poppins">
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
          <div>
            <SearchBar />
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex items-center gap-2 cursor-pointer">
              <Badge badgeContent={1} color="success">
                <FavoriteBorderIcon className="text-md text-custom-black" />
              </Badge>
              <h2 className="text-sm">Wishlist</h2>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Badge badgeContent={1} color="success">
                <ShoppingCartOutlinedIcon className="text-md text-custom-black" />
              </Badge>
              <Link href="/cart">
                <h2 className="text-sm">Cart</h2>
              </Link>
            </div>

            {/* Account */}
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer hover:text-main-green">
                <Avatar
                  alt={firstName ? firstName + " " + lastName : ""}
                  src=""
                  sx={{ width: 32, height: 32 }}
                />
                <h2
                  className="text-sm font-medium"
                  onClick={() => {
                    !isUserAuthenticated ? setShowsignup(true) : null;
                  }}
                >
                  {isUserAuthenticated ? firstName : "Login"}
                </h2>
              </div>
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-0.5 w-max bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-500">
                {isUserAuthenticated ? (
                  <div className="text-sm py-2">
                    <a
                      href="/profile"
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </a>
                    <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Orders
                    </p>
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 px-3 pt-4 pb-2">
                      <p className="text-sm">New Customer?</p>{" "}
                      <button
                        className="text-sm font-medium text-main-green"
                        onClick={() => setShowsignup(true)}
                      >
                        Sign Up
                      </button>
                    </div>
                    <hr className="" />
                    <div className="text-sm py-1">
                      <div className="flex gap-1.5 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <AccountCircleOutlinedIcon className="text-black text-xl" />
                        <p
                          onClick={() => {
                            !isUserAuthenticated ? setShowsignup(true) : null;
                          }}
                        >
                          My Profile
                        </p>
                      </div>
                      <div className="flex gap-1.5 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Inventory2OutlinedIcon className="text-black text-xl" />

                        <p
                          onClick={() => {
                            !isUserAuthenticated ? setShowsignup(true) : null;
                          }}
                        >
                          Orders
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
                <a href="/home">Home</a>
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

      {/* Login Popup */}
      {showsignup ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className=" relative">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setShowsignup(false)}
            >
              <CloseRoundedIcon />
            </button>
            <Signin />
          </div>
        </div>
      ) : null}

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
          <div className="sm:hidden">
            <SearchBar />
          </div>
        </Transition>
      </div>
    </>
  );
}

export default Navbar;
