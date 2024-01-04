import * as z from "zod";

export const PickUpDropOffSchema = z.object({
  location: z.string(),
  pickUpDate: z.date(),
  pickUpTime: z.string(),
  dropOffDate: z.date(),
  dropOffTime: z.string(),
});

export const AddCarSchema = z.object({
  title: z.string(),
  type: z.string(),
  price: z.string().transform(Number),
  capacity: z.string(),
  transmission: z.string(),
  location: z.string(),
  fuelCapacity: z.string().transform(Number),
  description: z.string(),
  imgUrl: z.string(),
});

export const SearchInputSchema = z.object({
  location: z.string(),
  availableFrom: z.date(),
  availableTo: z.date(),
})
