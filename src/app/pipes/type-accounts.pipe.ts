import { Pipe, PipeTransform } from '@angular/core';
import { TYPES_ACCOUNT } from '../constants/type-account';

@Pipe({
  name: 'typeAccounts'
})
export class TypeAccountsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    var typeAccount = TYPES_ACCOUNT.find(i => i.key === value);

    return typeAccount ? typeAccount.value.toString() : value;
  }

}
