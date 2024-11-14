"use client";
import React, { useState } from "react";
import EditAddressForm from "./EditAddressForm";

function EditAddressButton({ userAddress }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={handleClick} className="text-blue-800 text-sm">
        Edit
      </button>
      {showForm ? <EditAddressForm userAddress={userAddress} /> : null}
    </div>
  );
}

export default EditAddressButton;
