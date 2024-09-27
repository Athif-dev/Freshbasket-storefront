"use client";
import React, { useState } from "react";
import { Slider } from "@mui/material";

function PricingSlider() {
  const [value, setValue] = useState<number[]>([0, 100]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = Number(event.target.value);
    if (minValue <= value[1]) {
      setValue([minValue, value[1]]);
    }
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxValue = Number(event.target.value);
    if (maxValue >= value[0]) {
      setValue([value[0], maxValue]);
    }
  };

  return (
    <div>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={(val) => `$ ${val}`}
        min={0}
        max={1000} // adjust to match your product price range
        sx={{
          color: "#3BB77E",
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
            border: "1px solid lightgray",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#3BB77E",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#b2dfdb",
          },
        }}
      />
      <div className="flex mt-4 gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm">Min</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinInputChange}
            className="w-full h-9 text-sm bg-gray-100 pl-2 focus:outline-none"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm">Max</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxInputChange}
            className="w-full h-9 text-sm bg-gray-100 pl-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default PricingSlider;
