import React from "react";
import { getUser } from "@/app/lib/action";
import { cookies } from "next/headers";
import { Avatar } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

interface UserResponse {
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

async function MobileProfile() {
  let token: string | null = null;
  let response: UserResponse | null = null;

  const tokenCookie = cookies().get("token");

  if (tokenCookie) {
    token = tokenCookie.value;
  } else {
    console.log("User or token cookie not found.");
  }
  const fetchUser = async () => {
    try {
      response = await getUser(token);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  await fetchUser();

  return (
    <div>
      <div className="flex gap-36">
        <h2 className="text-xl text-center font-medium">{"<"}</h2>
        <h2 className="text-lg text-center font-medium">My Profile</h2>
      </div>
      <div className="flex gap-7 mt-9 items-center">
        <Avatar
          alt={
            response && response.customer ? response.customer.first_name : ""
          }
          src=""
          sx={{ width: 92, height: 92 }}
        />
        <div>
          <h2 className="text-base font-medium text-custom-black ">
            {response && response.customer ? response.customer.first_name : ""}
          </h2>
          <p className="text-sm text-gray-500 pt-1 pb-5">
            {response && response.customer ? response.customer.email : ""}
          </p>
          <button className="bg-main-green text-white text-base py-1.5 px-5 rounded">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mt-10 text-lg">
        <div className="flex justify-between py-2">
          <div className="flex gap-4 items-center text-lg">
            <FavoriteBorderOutlinedIcon />
            <p>Wishlist</p>
          </div>
          <h2 className="text-xl text-center font-medium">{">"}</h2>
        </div>
        <div className="flex justify-between py-2">
          <div className="flex gap-4 items-center text-lg">
            <Inventory2OutlinedIcon />
            <p>Orders</p>
          </div>
          <h2 className="text-xl text-center font-medium">{">"}</h2>
        </div>
        <div className="flex justify-between py-2">
          <div className="flex gap-4 items-center text-lg text-red-700">
            <LoginOutlinedIcon />
            <p>Logout</p>
          </div>
          <h2 className="text-xl text-center font-medium">{">"}</h2>
        </div>
      </div>
    </div>
  );
}

export default MobileProfile;
