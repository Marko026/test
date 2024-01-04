"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Slider } from "../ui/slider";
import { formUrlQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import CheckBoxes from "../Search/CheckBoxes";

const Filter = ({ searchParams }: SearchParamProps) => {
  const [maxPrice, setMaxPrice] = useState(0);
  let searchParamsInstance = new URLSearchParams(JSON.stringify(searchParams));

  const router = useRouter();

  const onValueChange = (value: number[]) => {
    setMaxPrice(value[0]);
  };

  useEffect(() => {
    handleChange("rentPrice", maxPrice);
  }, [maxPrice]);

  const handleChange = (key: string, value: string | number) => {
    let values = searchParamsInstance.get(key)
      ? searchParamsInstance.get(key)?.split(",")
      : [];

    const valueAsString = String(value);

    if (key === "rentPrice" && values && !values.includes(valueAsString)) {
      values = [valueAsString];
    } else if (values?.includes(valueAsString)) {
      values = values.filter((t) => t !== valueAsString);
    } else {
      values = values ?? [];
      values.push(valueAsString);
    }

    searchParamsInstance.set(key, values.join(","));

    searchParams = Object.fromEntries(Array.from(searchParamsInstance));

    const newUrl = formUrlQuery({
      params: JSON.stringify(searchParams),
      key: key,
      value: new URLSearchParams(JSON.stringify(searchParams)).get(key),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="lg:pt-[41px] lg:px-6 lg:bg-white-50 dark:bg-gray-900 lg:dark:border-r-[1px] border-gray-850 ">
        <div className="hidden lg:block text-xs font-semibold text-blue-100 mb-7">
          SEARCH
        </div>

        <div className="flex gap-4 mb-8 lg:mb-[52px] ">
          <input
            type="text"
            placeholder="Search something here"
            className="w-full h-[46px] dark:border-gray-800 dark:bg-gray-850 text-gray-700 font-normal text-xs leading-6 px-[11px] py-4 bg-white-50 rounded-md border border-blue-50"
          />
          <div className="h-[48px] w-[48px] bg-white-50 rounded-[10px] flex items-center justify-center p-3 border border-blue-50 dark:bg-gray-900 dark:border-gray-800">
            <Image
              src="/icons/filter-dark.png"
              width={24}
              height={24}
              alt="filter"
            />
          </div>
        </div>

        <div className="hidden lg:block ">
          <div className="hidden lg:block text-xs  font-semibold text-blue-100 mb-7">
            TYPE
          </div>

          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Sports"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Hybrid"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Electric"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Sedan"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Coupe"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"type"}
            capacity={""}
            type={"Hatchback"}
          />

          <div className="mt-14"></div>

          <div className="hidden lg:block text-xs  font-semibold text-blue-100 mb-7">
            CAPACITY
          </div>

          <CheckBoxes
            handleChange={handleChange}
            category={"capacity"}
            type={"someType"}
            capacity={"2"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"capacity"}
            type={"someType"}
            capacity={"4"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"capacity"}
            type={"someType"}
            capacity={"5"}
          />
          <CheckBoxes
            handleChange={handleChange}
            category={"capacity"}
            type={"someType"}
            capacity={"8"}
          />

          <div className="mt-14"></div>

          <div className="hidden lg:block text-xs  font-semibold text-blue-100 mb-7">
            PRICE
          </div>

          <div>
            <Slider
              className="w-[246px]"
              name="slider"
              defaultValue={[0]}
              max={200}
              onValueChange={(value: number[]) => onValueChange(value)}
            />
            <div className="mt-3 text-xl font-semibold text-gray-700">
              Max. ${maxPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
