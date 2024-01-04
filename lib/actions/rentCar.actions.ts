"use server";
import Stripe from "stripe";
import { CarProps } from "@/types";
import { redirect } from "next/navigation";
import { howManyDays, pickUpTime } from "../utils";
export const checkoutRentCar = async (rentCar: CarProps) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const formattedPickUpTime = pickUpTime(rentCar.pickUpTime);
  const formattedDropOffTime = pickUpTime(rentCar.dropOffTime);
  const sumDays = howManyDays(rentCar.pickUpDate, rentCar.dropOffDate);
  const price = Number(rentCar.rentPrice) * 100 * Number(sumDays);
  const rentDescription = `You rented a ${rentCar.title}-${rentCar.type} at ${rentCar.address}.
  From ${rentCar.pickUpDate.toLocaleDateString()} at ${formattedPickUpTime} till ${rentCar.dropOffDate.toLocaleDateString()} at ${formattedDropOffTime}.
  Enjoy the ride and drive carefully. Thank you for using our service.
  `;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: rentCar.title,
              images: rentCar.images,
              description: rentDescription,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        rentCarId: rentCar.id,
        ownerId: rentCar.ownerId,
        location: rentCar.location,
        type: rentCar.type,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};
