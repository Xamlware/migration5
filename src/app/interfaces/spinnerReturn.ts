export interface ISpinnerReturn {
  spinValue: number;
  spinName: string;
}

export class SpinnerReturn implements ISpinnerReturn {
  spinValue: number = 0;
  spinName: string = "";
}