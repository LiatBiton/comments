import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date | number | string): string {
    value = new Date(value)
    const past = value.getTime();
    const diff = Date.now() - past;
    if (diff < 1000 * 5) return '5 seconds ago';
    if (diff < 1000 * 60 * 7) return '7 minutes ago';
    if (diff < 1000 * 60 * 60 * 3) return '3 hours ago';
    if (diff > 1000 * 60 * 60 * 3) return '15/07/2018';
    return 'At: ' + value;
  }
}