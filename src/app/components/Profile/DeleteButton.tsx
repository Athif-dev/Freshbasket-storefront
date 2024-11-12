"use client";

import { deleteAddress } from "@/app/lib/action";

export default function DeleteButton({ addressId }) {
  return (
    <button
      onClick={() => deleteAddress(addressId)}
      className="text-blue-800 text-sm"
    >
      Remove
    </button>
  );
}
