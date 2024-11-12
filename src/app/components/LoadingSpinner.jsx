import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center ">
      <CircularProgress sx={{ color: "white", width: 15, height: 15 }} />
    </div>
  );
}

export default LoadingSpinner;
