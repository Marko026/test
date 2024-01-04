import React from "react";
import Image from "next/image";

import CarDetailsModal from "./shared/CarDetailsModal";
import FavoriteButton from "./shared/FavoriteButton";
import { CarMetrics } from "./shared/CarMetrics";
import { CarWithFavorite } from "@/types";

const CarCard = ({ carouselCarCard, car }: { carouselCarCard?: boolean; car: CarWithFavorite }) => {
  return (
    <article className={`flex flex-col p-4 sm:p-6 bg-white-50 ${carouselCarCard ? "max-w-[240px] sm:max-w-xs" : "max-w-full"}  dark:bg-gray-850 rounded-[10px]`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="paragraph-bold dark:text-white-50 md:base-bold">{car.title}</h3>
          <p className="small-regular text-gray-400">{car.type}</p>
        </div>

        <FavoriteButton carId={car.id} initialIsFavorite={car.isFavorite} />
      </div>
      <div
        className={`flex ${carouselCarCard ? "my-8" : "mb-8 mt-3"} 
           items-end justify-between sm:mt-12 sm:mb-9`}
      >
        <div className={`${carouselCarCard ? "w-full" : "w-2/3 h-[64px] sm:h-auto flex justify-center  sm:w-full"}  relative `}>
          <Image src="/images/suv-dark.png" width={248} height={100} alt="car" className="object-contain sm:object-cover mx-auto" />
          <div className="absolute inset-x-0 border-none bottom-0 h-8 bg-gradient-to-t from-white-100 to bg-transparent dark:from-gray-850 to dark:bg-transparent"></div>
        </div>

        {/* Metrics small screen */}
        <CarMetrics car={car} smallScreen={true} classes={`${carouselCarCard ? "hidden" : "flex justify-between flex-col sm:!hidden gap-4"}`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
      </div>

      {/* Metrics Large screens */}
      <CarMetrics car={car} smallScreen={false} classes={`${carouselCarCard ? "flex justify-between" : "sm:justify-between sm:flex hidden"} mb-7`} extraClasses={carouselCarCard ? "max-sm:w-[14px] max-sm:h-[14px]" : ""} />
      {/* Price button */}
      <div className="flex justify-between items-center">
        <div>
          <p className="paragraph-bold dark:text-white-50 sm:base-bold">
            ${car.rentPrice}/ <span className="small-regular text-gray-400 sm:body-regular">day</span>
          </p>
          <p className="small-regular sm:body-regular text-gray-400">$80.00</p>
        </div>
        <CarDetailsModal car={car} />
      </div>
    </article>
  );
};

export default CarCard;
