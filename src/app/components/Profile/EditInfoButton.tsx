"use client";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EditPersonalInfoForm from "./EditPersonalInfoForm";

export default function EditInfoButton({ userInfo }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="border rounded border-gray-300 p-1 text-sm font-medium text-gray-400 flex items-center gap-1 hover:bg-main-green hover:text-white ease-in-out transition-all"
      >
        <DriveFileRenameOutlineIcon sx={{ width: 15, height: 15 }} />
        Edit
      </button>
      {showForm ? <EditPersonalInfoForm user={userInfo} /> : null}
    </div>
  );
}
