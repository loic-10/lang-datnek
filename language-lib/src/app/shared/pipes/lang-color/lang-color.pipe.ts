import { Pipe, PipeTransform } from '@angular/core';
import { StatusModal } from '../../interfaces/status-modal';

@Pipe({
  name: 'langColor',
})
export class LangColorPipe implements PipeTransform {
  transform(value: StatusModal): string {
    let color = '';
    switch (value) {
      case 'close':
        color = 'secondary';
        break;
      case 'open':
        color = 'success';
    }
    return color;
  }
}
