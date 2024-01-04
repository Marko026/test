import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Page",
  description: "Search for your next car on RentWheels",
};

import SearchInputs from "@/components/shared/SearchInputs";
import Filter from "@/components/shared/Filter";

import { getFilteredCars } from "@/lib/actions/car.action";
import { SearchParamProps } from "@/types";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { cars } from "@/prisma/carData";
import { string, number } from "zod";
import page from "../(home)/page";

const Search = async ({ searchParams }: SearchParamProps) => {
  const cars = await getFilteredCars({
    searchParams,
    page: 0,
    perPage: 10,
  });

  return (
    <div className="max-w-[1312px] mx-auto lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6 dark:bg-[#1E2430] pr-6 pl-6 lg:pl-0">
      <Filter searchParams={searchParams} />
      <div className="lg:pt-6 mt-6">
        <SearchInputs searchParams={searchParams} />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
          <div className="mx-auto my-[42px]">
            <Button className=" bg-secondary hover:bg-primary  dark:group-hover:text-white-50 small-regular md:text-[16px] font-semibold text-white-50 ">Show more cars</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
