import AddCarForm from "@/components/form/CarForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Car",
  description: "Post a new car on RentWheels",
};

const NewCar = () => {
  return (
    <section className="bg-white-50 rounded-[10px] sm:mx-[86px] sm:mt-[36px] sm:mb-[56px]">
      <AddCarForm />
    </section>
  );
};

export default NewCar;
