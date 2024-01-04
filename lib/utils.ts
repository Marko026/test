import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBased64Image = (imageData: string) => {
  const regex = /^\s*data:(image\/(png|jpg|jpeg|gif|bmp));base64,/;
  return regex.test(imageData);
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  console.log("current url", currentUrl);
  if (value) {
    currentUrl[key] = value;
  } else {
    delete currentUrl[key];
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
export const showToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "default",
    className: "dark:bg-gray-850 dark:text-white-50 bg-white-200 text-gray-900",
  });
};

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const handleImageUpload = (file: File, onImageChange: (dataUrl: string) => void) => {
  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    const imageDataUrl = event.target?.result?.toString() || "";
    onImageChange(imageDataUrl);
  };

  fileReader.onerror = (error) => {
    console.error("Error reading file:", error);
    showToast("Error", "Error reading file");
  };

  fileReader.readAsDataURL(file);
};

export function pickUpTime(hour: string): string {
  const parsedHour = parseInt(hour, 10);
  if (parsedHour < 12) {
    return `${hour} AM`;
  } else {
    return `${parsedHour - 12} PM`;
  }
}
export function howManyDays(pickUpDate: string, dropOffDate: string): number {
  const date1 = new Date(pickUpDate);
  const date2 = new Date(dropOffDate);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export const handleError = (error: unknown, message: string, id?: number): never => {
  const errorMessage = id ? `${message} ${id}` : message;
  console.error(errorMessage, error instanceof Error ? error.message : error);
  throw new Error(errorMessage);
};
