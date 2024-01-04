import { cars } from "./carData";
import { prisma } from "./client";

async function main() {
  // Reset the database
  await prisma.booking.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  // Create three users, one admin and two regular
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      username: "admin",
      email: "admin@example.com",
      clerkId: "user_56789",
      password: "adminpass",
      role: "ADMIN",
      picture: "admin.jpg",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: "Regular User 1",
      username: "regular",
      email: "user1@example.com",
      clerkId: "user_01234",
      password: "userpass",
      role: "USER",
      picture: "user1.jpg",
    },
  });

  const regularUser2 = await prisma.user.create({
    data: {
      name: "Regular User 2",
      username: "regular2",
      email: "user2@example.com",
      clerkId: "user_2ZO3sjjMK3ItnPvRxMQDuEp68mm",
      password: "userpass",
      role: "USER",
      picture: "user2.jpg",
    },
  });

  // Create an array of owner IDs
  const ownerIds = [adminUser.clerkId, regularUser.clerkId];
  const createdCars = [];

  for (const car of cars) {
    const randomOwnerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
    const createdCar = await prisma.car.create({
      data: {
        ...car,
        ownerId: randomOwnerId,
      },
    });
    createdCars.push(createdCar);
  }

  // Shuffle the createdCars array
  const shuffledCars = shuffleArray([...createdCars]);

  // Select first five cars (or the total number of cars if less than five)
  const selectedCars = shuffledCars.slice(0, Math.min(5, shuffledCars.length));

  // Iterate over the selected cars to create favorites and bookings
  for (const car of selectedCars) {
    await prisma.favorite.create({
      data: {
        userId: regularUser2.id,
        carId: car.id,
      },
    });

    // Create bookings for regularUser 2
    await prisma.booking.create({
      data: {
        userId: regularUser2.id,
        carId: car.id,
        pickupDateTime: new Date(),
        dropoffDateTime: new Date(),
        pickupAddress: "Some Address",
        latitude: 52.52,
        longitude: 13.405,
        placeId: "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
      },
    });
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
