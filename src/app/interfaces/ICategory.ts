import { MODES } from "../constants/modes";

export interface ICategory {
  id?: string;
  name: string;
  description: string;
  mode?: MODES;
}


