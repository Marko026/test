"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car } from "@prisma/client";
import RentalForm from "../form/RentalForm";

const images = ["/images/view.svg", "/images/Look3.svg", "/images/Look2.svg", "/images/view.svg", "/images/Look3.svg", "/images/Look2.svg", "/images/view.svg"];

const CarDetailsModal = ({ car }: { car: Car }) => {
  const [open, setOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedImage = images[selectedImageIndex];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const openPickup = () => onOpenChange(true);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(!isOpen);
    setPickupOpen(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="btn bg-secondary h-9 sm:h-11 small-regular sm:paragraph-medium tracking-wider text-white-50 px-5 rounded">More info</button>
        </DialogTrigger>
        <DialogContent className=" px-2 rounded-[10px] mt-[194px] max-w-[1054px] dark:bg-gray-850 dark:border-none">
          <div className="dark:bg-gray-850 p-4 bg-white-50 w-full md:grid md:grid-cols-[45%_55%] md:gap-x-7 xl:gap-x-14 lg:h-[540px] md:p-6">
            <div>
              <div className="h-[232px] w-full mb-6 relative lg:h-[340px]">
                <Image src={selectedImage} alt="ads" layout="fill" objectFit="cover" className="absolute inset-0 rounded-[10px]" />
              </div>
              <div className="flex gap-5 overflow-x-auto dark:dark">
                {images.map((imageSrc, index) => (
                  <div key={imageSrc} className={`h-[64px] lg:h-[124px] lg:min-w-[146px] min-w-[96px] relative ${selectedImageIndex === index ? "border-2 border-primary rounded-[10px] overflow-hidden" : "rounded-[10px] overflow-hidden"}`} onClick={() => handleImageClick(index)}>
                    <Image src={imageSrc} alt={`car ${index}`} width={96} height={64} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 md:pr-6 xl:mr-8 md:flex md:flex-col md:justify-between md:pt-0">
              <div>
                <h3 className="text-gray-900 text-xl font-bold lg:text-[32px] md:pt-2 dark:text-white-50">{car.title}</h3>
              </div>

              <div className="py-4 dark:text-white-200 text-gray-700 font-normal text-xs leading-6 tracking-tighter lg:leading-10 lg:text-xl lg:tracking-wider">
                <p>{car.description}</p>
              </div>

              <div className="flex justify-between text-xs gap-x-[47px] lg:text-xl">
                <div className="w-2/4 flex flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Type Car</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Transm.</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.transmission}</span>
                  </div>
                </div>
                <div className="w-2/4 flex flex-col gap-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Capacity</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-400 tracking-tight lg:font-normal">Gasonline</span>
                    <span className="font-semibold tracking-tighter text-gray-700 dark:text-white-200">{car.fuelCapacity}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div>
                  <div>
                    <span className="text-gray-900 text-xl font-bold lg:text-[28px] dark:text-white-50">${car.rentPrice}/</span>
                    <span className="text-gray-400 text-xs font-bold lg:text-base"> day</span>
                  </div>
                  <div className="font-bold text-xs text-gray-400 line-through mt-2.5 lg:text-base md:mb-8">$100.00</div>
                </div>
                <Button variant="default" className="btn-primary w-[125px] h-[54px] lg:h-[56px] text-sm lg:text-base" onClick={openPickup}>
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RentalForm title="Rent Now" car={car} open={pickupOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default CarDetailsModal;
