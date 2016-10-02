import {Physical} from './physical';
import {Blood} from './blood';
import {Lipid} from './lipid';

export interface IFood {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export class Food implements IFood {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sodium: number;
  fiber: number;
}    