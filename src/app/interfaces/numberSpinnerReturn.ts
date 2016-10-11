export interface INumberSpinnerReturn {
  spinValue: number;
  spinName: string;
}

export class NumberSpinnerReturn implements INumberSpinnerReturn {
  spinValue: number = 0;
  spinName: string = "";
}