import { Pipe, PipeTransform } from '@angular/core';
import { NATURES } from '../constants/natures';

@Pipe({
  name: 'natures'
})
export class NaturesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    var nature = NATURES.find(i => i.key === value);

    return nature ? nature.value.toString() : value;
  }

}
