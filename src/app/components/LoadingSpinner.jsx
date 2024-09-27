import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <CircularProgress sx={{ color: "#3BB77E" }} />
    </div>
  );
}

export default LoadingSpinner;
