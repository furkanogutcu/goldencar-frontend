import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  addDayToDate(date: Date, addedDay: number): string {
    let newDate = date;
    newDate.setDate(date.getDate() + addedDay);
    let returnString = this.formatDate(newDate);
    return returnString;
  }

  convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  getDateNow(): string {
    let date = new Date();
    let returnStr = this.formatDate(date);
    return returnStr;
  }

  getTimeNow():string{
    let date = new Date();
    return date.toLocaleTimeString();
  }

  getFullDateTimeNow():string{
    let date = new Date();
    let returnStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return returnStr;
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    let hours = Math.abs(returnDate.getTime() - rentDate.getTime());
    let days = Math.ceil(hours / (1000 * 3600 * 24));
    return days;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString().split(".").reverse().join("-");
  }

  showDate(date: Date) {
    return date.toLocaleDateString();
  }
}
