import React from "react";
import { cookies } from "next/headers";
import Signin from "../components/Signin/Signin";
import Avatar from "@mui/material/Avatar";
import { getUser } from "../lib/action";
import Address from "../components/Profile/Address";
import DeleteButton from "../components/Profile/DeleteAddressButton";
import EditButton from "../components/Profile/EditAddressButton";
import DeleteInfoButton from "../components/Profile/EditInfoButton";

interface User {
  customer: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    first_name: string;
    last_name: string;
    billing_address_id: string | null;
    phone: string | null;
    has_account: boolean;
    metadata: any;
    billing_address: any | null;
    shipping_addresses: Array<any>;
  };
}
interface Address {
  id: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string | null;
  city: string;
  province: string;
  postal_code: string;
  phone: string | null;
}

async function page() {
  let user: User | null = null;
  let token = null;

  const userCookie = cookies().get("user");
  const tokenCookie = cookies().get("token");

  if (userCookie && tokenCookie) {
    token = tokenCookie.value;
  } else {
    console.log("User or token cookie not found.");
  }

  const fetchUser = async () => {
    try {
      user = await getUser(token);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  await fetchUser();

  if (!token) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className=" relative">
          <button className="absolute top-2 right-2 text-white">x</button>
          <Signin />
        </div>
      </div>
    );
  }
  return (
    <div className=" font-poppins">
      <h2 className="text-lg font-medium">My Profile</h2>
      <div className="flex justify-between items-center border border-gray-200 rounded-lg py-6 px-4 mt-5">
        <div className="flex gap-3 items-center">
          <Avatar alt="" src="" sx={{ width: 52, height: 52 }} />
          <div>
            {" "}
            <h2 className="text-sm font-medium text-custom-black">
              {user ? user.customer.first_name : "N/A"}
            </h2>
            <p className="text-xs text-gray-500">
              {" "}
              {user ? user.customer.email : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Informaton */}
      <div className="mt-7 border border-gray-200 rounded-lg pt-6 pb-10 px-4">
        <div className="flex justify-between items-center ">
          <h2 className="text-base font-medium text-custom-black">
            Personal Informaton
          </h2>
          <div>
            <DeleteInfoButton userInfo={user} />
          </div>
        </div>

        <div className="text-gray-500 mt-7">
          <div className="flex gap-80 ">
            <div>
              <p className="text-sm font-light">First Name</p>
              <h1 className="text-sm font-medium mt-2">
                {user ? (user as User).customer.first_name : "N/A"}
              </h1>
            </div>
            <div>
              <p className="text-sm font-light">Last Name</p>
              <h1 className="text-sm font-medium mt-2">
                {" "}
                {user ? (user as User).customer.last_name : "N/A"}
              </h1>
            </div>
          </div>
          <div className="flex gap-60 mt-5">
            <div>
              <p className="text-sm font-light">Email Address</p>
              <h1 className="text-sm font-medium mt-2">
                {" "}
                {user ? (user as User).customer.email : "N/A"}
              </h1>
            </div>
            <div>
              <p className="text-sm font-light">Phone</p>
              <h1 className="text-sm font-medium mt-2">
                {" "}
                {user ? (user as User).customer.phone : "N/A"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-7">
        <h2 className="text-base font-medium text-custom-black">Addresses</h2>
        <div className="grid grid-cols-2 gap-5">
          <Address />
          {user?.customer?.shipping_addresses?.map((address: Address) => {
            return (
              <div
                key={address.id}
                className="text-gray-500 max-h-[200px] mt-4 border border-gray-200 rounded-lg py-7 px-4"
              >
                <div>
                  <h1 className="text-sm font-medium mt-2 mb-2">
                    {address.first_name}{" "}
                  </h1>
                  <p className="text-sm font-light">{address.address_1}</p>

                  <p className="text-sm font-light">{address.address_2}</p>
                  <p className="text-sm font-light">
                    {address.city}, {address.postal_code}
                  </p>

                  <p className="text-sm font-light">
                    Phone Number: {address.phone ? address.phone : "N/A"}
                  </p>
                  <div className="flex mt-2 gap-2">
                    <EditButton userAddress={address} />

                    <DeleteButton addressId={address.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
