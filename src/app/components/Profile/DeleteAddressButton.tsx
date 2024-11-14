'use client'
import { deleteAddress } from "@/app/lib/action";
import { useState } from "react";

interface DeleteButtonProps {
  addressId: string;
}

export default function DeleteButton({ addressId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAddress(addressId);
    } catch (error) {
      console.error("Failed to delete address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-sm ${
        isDeleting ? "text-gray-500" : "text-blue-800 hover:text-red-700"
      }`}
    >
      {isDeleting ? "Deleting..." : "Remove"}
    </button>
  );
}
