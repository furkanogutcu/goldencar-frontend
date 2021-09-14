export interface Rental {
  id: number;
  carId:number;
  modelFullName: string;
  customerId:number;
  customerFullName: string;
  dailyPrice: number;
  rentDate: Date;
  returnDate: Date;
  deliveryStatus:boolean;
}
