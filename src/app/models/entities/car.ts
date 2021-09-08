import { CarImage } from "./car-image";

export interface Car {
  id: number;
  brandId:number;
  brandName: string;
  colorId:number;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  carImages:CarImage[];
}
