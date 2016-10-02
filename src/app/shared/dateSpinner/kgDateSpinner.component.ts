import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DateSpinnerReturn } from '../../interfaces/dateSpinnerReturn';
import { Theme } from '../../interfaces/theme';
import { User } from '../../interfaces/user';
import { Round } from '../../helpers/math.helper';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';


@Component({
  
  selector: 'kg-dateSpinner',
  templateUrl: './app/shared/numberSpinner/kgSpinner.component.html',
  styleUrls: ['./app/shared/numberSpinner/kgSpinner.component.css']
})

export class KgDateSpinnerComponent implements OnInit {
  sr: DateSpinnerReturn;
  userSettings: User;
  

  //@Output() onChanged = new EventEmitter<SpinnerReturn>();

  constructor(private ts: ThemeService,
              private ss: SettingsService) {
    this.sr = new DateSpinnerReturn();
  }

  ngOnInit() {
   
  }


  // onIncrement() {
  //   this.curValue = Round(this.curValue + this.increment, this.precision);
  //   if (this.curValue > this.upperLimit) {
  //     this.curValue = this.upperLimit
  //   }


  //   this.returnEvent();
  // }

  // onDecrement() {
  //   this.curValue = Round(this.curValue - this.increment, this.precision);
  //   if (this.curValue < this.lowerLimit) {
  //     this.curValue = this.lowerLimit
  //   }

  //   this.returnEvent();
  // }

  // returnEvent() {
  //   this.sr.spinValue = this.curValue;
  //   this.sr.spinName = this.spinName;
  //   this.onChanged.emit(this.sr)

  // }

}
