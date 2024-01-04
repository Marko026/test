import { Metadata } from "next";

import { currentUser } from "@clerk/nextjs";

import Featured from "@/components/Featured";
import PopularCars from "@/components/PopularCars";
import RecommendedCars from "@/components/RecommendedCars";
import { getAllCars, getAllCarsWithFavorites } from "@/lib/actions/car.action";
import { CarWithFavorite } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of RentWheels",
};

const Home = async () => {
  const user = await currentUser();
  let cars: CarWithFavorite[] = [];

  if (user?.publicMetadata.userId) {
    const userId = +user.publicMetadata.userId;
    cars = await getAllCarsWithFavorites(userId);
  } else {
    cars = await getAllCars();
  }

  return (
    <div className="space-y-8 mt-6">
      <Featured />
      <PopularCars cars={cars} />
      <RecommendedCars cars={cars} />
    </div>
  );
};

export default Home;
