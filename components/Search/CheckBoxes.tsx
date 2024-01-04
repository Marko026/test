// @ts-nocheck

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import React from "react";

const CheckBoxes = ({ handleChange, category, type, capacity }) => {
  return (
    <div className="flex gap-2 items-center mb-8">
      <Checkbox id={type || capacity} value="" className="w-6 h-6 rounded-md" onClick={() => handleChange(category, type || capacity)} />
      <Label htmlFor="Sport" className="text-gray-700 font-semibold text-xl leading-6 dark:text-white-100">
        {type || `${capacity} person`}
        <span className="text-gray-400 font-medium"> (10)</span>
      </Label>
    </div>
  );
};

export default CheckBoxes;
