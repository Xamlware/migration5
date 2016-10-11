import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NumberSpinnerReturn } from '../../interfaces/numberSpinnerReturn';
import { Theme } from '../../interfaces/theme';
import { Round } from '../../helpers/math.helper';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'kg-numberSpinner',
  templateUrl: 'kgNumberSpinner.component.html',
  styleUrls: ['kgNumberSpinner.component.css']
})

export class KgNumberSpinnerComponent implements OnInit {


  @Input('startValue') curValue: number;
  @Input() range: number[];
  @Input() increment: number;
  @Input() spinName;
  @Input() precision: number;
  @Input() theme: string;

  @Output() onChanged = new EventEmitter<NumberSpinnerReturn>();

  lowerLimit: number;
  upperLimit: number;
  name: string;
  curTheme: Theme;
  errorMessage: string;
  sr: NumberSpinnerReturn;
  appPageHeaderDivStyle: {};
  unit: string = "(g)";

  constructor(private ts: ThemeService) {
    this.sr = new NumberSpinnerReturn();
  }

  ngOnInit() {
    this.lowerLimit = this.range[0];
    this.upperLimit = this.range[1];
    this.appPageHeaderDivStyle = this.ts.getAppPageHeaderDivStyle();
    if(this.spinName === "carbGoal") {
      this.unit = "(g)";
    } else if (this.spinName === "proteinGoal") {
      this.unit = "(g)";
    } else {
      this.unit = "(%)";
    }
  }


  onIncrement() {
    this.curValue = Round(this.curValue + this.increment, this.precision);
    if (this.curValue > this.upperLimit) {
      this.curValue = this.upperLimit
    }


    this.returnEvent();
  }

  onDecrement() {
    this.curValue = Round(this.curValue - this.increment, this.precision);
    if (this.curValue < this.lowerLimit) {
      this.curValue = this.lowerLimit
    }

    this.returnEvent();
  }

  returnEvent() {
    this.sr.spinValue = this.curValue;
    this.sr.spinName = this.spinName;
    this.onChanged.emit(this.sr)

  }

}
