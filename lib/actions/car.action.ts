"use server";

import { prisma } from "@/prisma/client";
import { CarWithFavorite } from "@/types";

interface Filters {
  searchParams: { [key: string]: string | string[] | undefined };
  page?: number;
  perPage?: number;
}

// Get filtered cars
export const getFilteredCars = async (filters: Filters) => {
  try {
    const filterObject: { [key: string]: any } = {};
    if (filters?.searchParams?.type) {
      const type = Array.isArray(filters.searchParams.type)
        ? filters.searchParams.type[0]
        : filters.searchParams.type;
      filterObject["type"] = {
        in: type.split(","),
      };
    }
    if (filters.searchParams.capacity) {
      const capacity = Array.isArray(filters.searchParams.capacity)
        ? filters.searchParams.capacity[0]
        : filters.searchParams.capacity;
      filterObject["capacity"] = {
        in: capacity.split(",").map(Number),
      };
    }
    if (filters.searchParams.rentPrice) {
      filterObject["rentPrice"] = {
        lte: Number(filters.searchParams.rentPrice),
      };
    }
    if (filters.searchParams.location) {
      const location = Array.isArray(filters.searchParams.location)
        ? filters.searchParams.location[0]
        : filters.searchParams.location;
      filterObject["location"] = {
        in: location.split(","),
      };
    }

    const cars = await prisma.car.findMany({
      where: filterObject,
      take: filters.perPage ?? 10, // Provide a default value of 10 if filters.perPage is undefined
      skip: (filters.page ?? 0) * (filters.perPage ?? 0), // Provide a default value of 0 if either filters.page or filters.perPage is undefined
    });
    return cars;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting filtered cars");
  }
};

// Get all cars
export const getAllCars = async () => {
  try {
    const cars = await prisma.car.findMany();
    return cars;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all cars");
  }
};

// Get a car by id
export const getCarById = async (id: number) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    });
    return car;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting car by id");
  }
};

// Get all my cars
export const getMyOwnedCars = async (userId: number) => {
  try {
    const userWithCars = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        carsForRent: true,
      },
    });

    return userWithCars ? userWithCars.carsForRent : [];
  } catch (error) {
    console.error(`Error fetching owned cars for user ${userId}:`, error);
    throw new Error(`Error fetching owned cars for user ${userId}`);
  }
};

// Get my rented cars
export const getMyRentedCars = async (
  userId: number
): Promise<CarWithFavorite[]> => {
  try {
    const myRentedCars = await prisma.car.findMany({
      where: {
        bookings: {
          some: {
            userId,
          },
        },
      },
    });
    return myRentedCars;
  } catch (error) {
    console.error(`Error fetching rented cars for user ${userId}:`, error);
    throw new Error(`Error getting rented cars for user ${userId}`);
  }
};

export const getAllCarsWithFavorites = async (
  userId: number
): Promise<CarWithFavorite[]> => {
  try {
    const carsWithFavorites = await prisma.$queryRaw<CarWithFavorite[]>`
      SELECT c.*,
             (CASE WHEN f.id IS NOT NULL THEN TRUE ELSE FALSE END) as "isFavorite"
      FROM "cars" as c
      LEFT JOIN (
        SELECT *
        FROM "favorites"
        WHERE "userId" = ${userId}
      ) as f ON c.id = f."carId"
    `;

    return carsWithFavorites;
  } catch (error) {
    console.error("Error fetching cars with favorites:", error);
    throw new Error("Error fetching cars with favorites");
  }
};

// "use server";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// interface searchCarsParams {
//   title?: string;
//   type?: string;
//   location?: string;
//   fromDate?: string;
//   toDate?: string;
//   capacity?: number;
//   minPrice?: number;
//   maxPrice?: number;
// }
// // Search and filter all cars by title, type, location, capacity, minPrice, maxPrice, fromDate, toDate
// export const searchCars = async ({
//   title,
//   type,
//   location,
//   fromDate,
//   toDate,
//   capacity,
//   minPrice,
//   maxPrice,
// }: searchCarsParams) => {
//   try {
//     const cars = await prisma.car.findMany({
//       where: {
//         AND: [
//           title
//             ? {
//                 OR: [
//                   { title: { contains: title, mode: "insensitive" } },
//                   { type: { contains: title, mode: "insensitive" } },
//                 ],
//               }
//             : {},
//           type ? { type: { equals: type } } : {},
//           location
//             ? { location: { contains: location, mode: "insensitive" } }
//             : {},
//           capacity ? { capacity: { equals: capacity } } : {},
//           minPrice ? { rentPrice: { gte: minPrice } } : {},
//           maxPrice ? { rentPrice: { lte: maxPrice } } : {},
//           fromDate
//             ? {
//                 bookings: {
//                   none: {
//                     OR: [
//                       {
//                         pickupDateTime: {
//                           lte: fromDate ? new Date(fromDate) : undefined,
//                         },
//                       },
//                       {
//                         dropoffDateTime: {
//                           gte: toDate ? new Date(toDate) : undefined,
//                         },
//                       },
//                     ],
//                   },
//                 },
//               }
//             : {},
//         ],
//       },
//     });

//     return cars;
//   } catch (error) {
//     console.error(error);
//     await prisma.$disconnect();
//     throw new Error("Error getting all cars");
//   }
// };

// // Get all my cars
// export const getMyCars = async (ownerId: string) => {
//   try {
//     const cars = await prisma.car.findMany({
//       where: {
//         ownerId,
//       },
//       include: {
//         owner: true,
//       },
//     });

//     await prisma.$disconnect();

//     return cars;
//   } catch (error) {
//     console.error(error);
//     await prisma.$disconnect();
//     throw new Error("Error getting all my cars");
//   }
// };

// Add a new car

interface AddCarParams {
  title: string;
  type: string;
  price: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  description: string;
  images: string;
  blurDataURL: string;
  userId: string;
}

export const addCar = async ({
  title,
  type,
  price,
  capacity,
  transmission,
  location,
  fuelCapacity,
  description,
  images,
  blurDataURL,
  userId,
}: AddCarParams) => {
  console.log(userId);
  try {
    const newCar = await prisma.car.create({
      data: {
        title,
        type,
        rentPrice: price,
        capacity,
        transmission,
        location,
        fuelCapacity,
        description,
        images: [images],
        //@ts-ignore
        blurDataURL: blurDataURL,
        ownerId: userId,
      },
    });

    return newCar;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding new car");
  }
};
