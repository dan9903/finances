import { IKeyValue } from "../interfaces/IKeyValue";

export const NATURES: IKeyValue[] = [
  { key: 'I', value: 'Income' },
  { key: 'O', value: 'Outcome' },
  { key: 'B', value: 'Both' }
]

export class NatureEnum {
  public static readonly INCOME = { key: 'I', value: 'Income' } as IKeyValue;
  public static readonly OUTCOME = { key: 'O', value: 'Outcome' } as IKeyValue;
  public static readonly BOTH = { key: 'B', value: 'Both' } as IKeyValue;
}
