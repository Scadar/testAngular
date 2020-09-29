import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe extends DatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string {
    if (date == null){
      return 'Без срока';
    }

    date = new Date(date);

    const currentDate = new Date().getDay();

    if (date.getDay() === currentDate){
      return 'Сегодня';
    }

    if (date.getDay() === currentDate - 1){
      return 'Вчера';
    }

    if (date.getDay() === currentDate + 1){
      return 'Завтра';
    }

    return new DatePipe('ru-RU').transform(date, format);
  }
}
