import { formatDate } from "@angular/common";

export class DateUtils {

  static convertToMMMdy(date: Date): string {
    return formatDate(date, 'MMM d, yyyy', 'en-us');
  }

  static convertToRequest(date: Date): string {
    return formatDate(date, 'MM/dd/yyyy', 'en-us');
  }

  static convertToMMMd(date: Date): string {
    return formatDate(date, 'MMM d', 'en-us');
  }

  static convertToRangeDisplay(startDate: Date, endDate: Date): string {
    const startConv = DateUtils.convertToMMMdy(startDate);
    console.log(startConv)
    const endConv = DateUtils.convertToMMMdy(endDate);
    return `${startConv.split(',')[0]} - ${endConv}`;
  }
}
