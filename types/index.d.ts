import { Car } from "@prisma/client";

type StyleField = string | CSSProperties | ((args: CallbackArguments) => string | CSSProperties);

type SearchParamProps = {
  params?: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export interface CarWithFavorite extends Car {
  isFavorite?: boolean;
}

export interface FavoriteButtonProps {
  carId: number;
  initialIsFavorite: boolean | undefined;
}

export interface TransmissionIconProps {
  width: number;
  height: number;
  alt: string;
  extraClasses?: string;
}

export interface FavoriteParams {
  userId: number;
  carId: number;
}

export interface CarProps {
  id: number;
  title: string;
  type: string;
  rentPrice: number;
  location: string;
  images: string[];
  ownerId: string;
  address: string;
  pickUpDate: pickUpDate;
  pickUpTime: pickUpTime;
  dropOffDate: dropOffDate;
  dropOffTime: dropOffTime;
}

export type MyCarsProps = {
  cars: CarWithFavorite[] | [];
  title: string;
  withButton?: boolean;
  buttonText?: string;
};

export interface NewBooking {
  userId: number;
  carId: number;
  pickupDateTime: Date;
  dropoffDateTime: Date;
  pickupAddress: string;
  latitude: number;
  longitude: number;
  placeId: string;
}

