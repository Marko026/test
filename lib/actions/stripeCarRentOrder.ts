"use server";
import { prisma } from "@/prisma/client";
import { NewBooking } from "@/types";

export const bookCar = async (booking: NewBooking) => {
  const { userId, carId, pickupDateTime, dropoffDateTime, pickupAddress, latitude, longitude, placeId } = booking;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        carId,
        pickupDateTime,
        dropoffDateTime,
        pickupAddress,
        latitude,
        longitude,
        placeId,
      },
    });

    return newBooking;
  } catch (error) {
    console.error("Error booking car:", error);
    throw new Error("Error booking car");
  }
};
