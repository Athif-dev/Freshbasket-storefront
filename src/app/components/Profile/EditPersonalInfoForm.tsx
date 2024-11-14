"use client";
import React, { useState } from "react";
import { editUser } from "@/app/lib/action";
import { CircularProgress } from "@mui/material";

export default function EditPersonalInfoForm({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const [firstName, setFirstName] = useState(user.customer.first_name);
  const [lastName, setLastName] = useState(user.customer.last_name);
  const [phone, setPhone] = useState(user.customer.phone);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const closePopup = () => setIsOpen(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate first name and last name
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const EditInfoHandler = async () => {
    validateForm();
    setLoading(true);
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone: phone.toString(),
    };
    try {
      const response = await editUser(userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white py-6 px-16 rounded-lg shadow-lg border">
            {loading ? (
              <CircularProgress sx={{ color: "green" }} size={40} />
            ) : (
              <div>
                <p className="text-lg font-semibold">Edit Information</p>
                <form
                  className="flex flex-col gap-3 items-center mt-4"
                  onSubmit={EditInfoHandler}
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
                        <span className="text-red-600 text-xs mt-1 text-left">
                          {errors.firstName}
                        </span>
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
                        <span className="text-red-600 text-xs mt-1 text-left">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col w-full ">
                    <div className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm">
                      <p className="text-gray-400 cursor-not-allowed text-nowrap">
                        {user.customer.email}
                      </p>
                    </div>
                    {errors.lastName && (
                      <span className="text-red-600 text-xs mt-1 text-left">
                        {errors.lastName}
                      </span>
                    )}
                  </div>

                  <input
                    className="border border-gray-200 text-base py-1.5 px-2 w-full bg-gray-50 rounded-sm shadow-sm"
                    placeholder="Phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <span className="text-red-600 text-xs mt-1 text-left">
                      {errors.phone}
                    </span>
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
                    onClick={EditInfoHandler}
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
}
