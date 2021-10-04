import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNum'
})
export class PersianNumPipe implements PipeTransform {
  transform(value: any, args: string[]= null): any {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      if (value){
          return value
          .toString()
          .replace(/\d/g, x => farsiDigits[x]);
      }else if (value === '0' || value === 0){
          return '۰';
      }else{
          return '۰';
      }
  }
}
