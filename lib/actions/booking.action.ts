"use server";

import { prisma } from "@/prisma/client";

// Get all bookings
export const getAllBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        car: {
          include: {
            owner: true,
          },
        },
        user: true,
      },
    });

    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting bookings");
  }
};

// search booking by name, username, email, car name, car model
export const searchBookings = async (searchTerm: string) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          {
            user: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              username: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              email: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            car: {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            car: {
              type: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            car: {
              owner: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        car: true,
        user: true,
      },
    });

    return bookings;
  } catch (error) {
    console.error(error);
    throw new Error("Error searching bookings");
  }
};

// Delete a booking
export const deleteBooking = async (id: number) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      console.error(`Booking not found for id: ${id}`);
      return null;
    }

    return await prisma.booking.delete({
      where: {
        id: booking.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting booking");
  }
};
