"use client";

import { addAddress } from "@/app/lib/action";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const Address = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate first name and last name
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";

    // Validate address
    if (!address) newErrors.address = "Address is required.";
    if (!building) newErrors.building = "Building info is required.";

    // Validate postal code (5-6 digits)
    if (!/^\d{5,6}$/.test(postal))
      newErrors.postal = "Enter a valid postal code.";

    // Validate city
    if (!city) newErrors.city = "City is required.";

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAddressHandler = async () => {
    validateForm();
    setLoading(true);
    const addressData = {
      address: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        address_2: building,
        postal_code: postal.toString(),
        city: city,
        phone: phone.toString(),
        country_code: "IN",
      },
    };
    try {
      const response = await addAddress(addressData);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="min-h-[200px] text-gray-500 mt-4 border border-dashed border-gray-400 rounded-lg py-7 px-4 cursor-pointer flex flex-col justify-center items-center"
        onClick={openPopup}
      >
        <p className="text-4xl">+</p>
        <p className="text-sm">Add Address</p>
      </div>

      {/* Popup modal */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white py-6 px-16 rounded-lg shadow-lg border">
            {loading ? (
              <CircularProgress sx={{ color: "green" }} size={40} />
            ) : (
              <div>
                <p className="text-lg font-semibold">Add New Address</p>
                <form
                  className="flex flex-col gap-3 items-center mt-4"
                  onSubmit={addAddressHandler}
                >
                  <div className="flex gap-5">
                    <div className="flex flex-col w-full">
                      <input
                        className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <span className="text-red-600 text-xs mt-1 text-left">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <input
                        className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.lastName && (
                        <span className="text-red-600 text-xs mt-1 text-left">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <input
                    className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && (
                    <span className="text-red-600 text-xs mt-1 text-left">{errors.address}</span>
                  )}

                  <input
                    className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                    placeholder="Building, Apartment, etc"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                  />
                  {errors.building && (
                    <span className="text-red-600 text-xs mt-1 text-left">{errors.building}</span>
                  )}

                  <div className="flex gap-5">
                    <div className="flex flex-col w-full">
                      <input
                        className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                        placeholder="Postal Code"
                        type="number"
                        value={postal}
                        onChange={(e) => setPostal(e.target.value)}
                      />
                      {errors.postal && (
                        <span className="text-red-600 text-xs mt-1 text-left">{errors.postal}</span>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <input
                        className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      {errors.city && (
                        <span className="text-red-600 text-xs mt-1 text-left">{errors.city}</span>
                      )}
                    </div>
                  </div>

                  <input
                    className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                    placeholder="Phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <span className="text-red-600 text-xs mt-1 text-left">{errors.phone}</span>
                  )}
                </form>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <button
                    onClick={closePopup}
                    className="text-custom-black text-base bg-gray-300 py-1.5 px-3 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addAddressHandler}
                    className="text-white text-base bg-main-green py-1.5 px-3 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
