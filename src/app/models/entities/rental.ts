export class Rental {
  id: number;
  carId:number;
  modelFullName: string;
  customerId:number;
  customerFullName: string;
  dailyPrice: number;
  rentDate: Date;
  returnDate: Date;
  paymentId:number;
  paymentDate:Date;
  deliveryStatus:boolean;
}
