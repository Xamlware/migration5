import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateSpinnerReturn } from '../../interfaces/dateSpinnerReturn';
import { Theme } from '../../interfaces/theme';
import { User } from '../../interfaces/user';
import { Round } from '../../helpers/math.helper';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import * as moment from "moment";
import { Calendar } from 'primeng/primeng'


@Component({

  selector: 'kg-dateSpinner',
  templateUrl: 'kgDateSpinner.component.html',
  styleUrls: ['kgDateSpinner.component.css']
})

export class KgDateSpinnerComponent implements OnInit {
  @Output() onChanged = new EventEmitter<DateSpinnerReturn>();
  @Output() onLoadFood = new EventEmitter<DateSpinnerReturn>();

  sr: DateSpinnerReturn;
  userSettings: User;
  cd = moment();
  currentDate: string = this.cd.format("MMMM DD, YYYY");;
  dateSpinnerForm: FormGroup;

  //@Output() onChanged = new EventEmitter<numberSpinnerReturn>();

  constructor(
    private ts: ThemeService,
    private fb: FormBuilder,
    private ss: SettingsService) {

    this.sr = new DateSpinnerReturn();
  }


  ngOnInit() {
    this.dateSpinnerForm = this.fb.group({
      currentDate: [this.currentDate, []]
    });
  }

  onLoadFoodRequest() {
    debugger;
    this.sr.spinValue = this.currentDate;
    this.onLoadFood.emit(this.sr)
  }

  onDateSelected(event: any) {
    this.cd = moment(event);
    this.returnEvent();
  }

  onIncrement() {
    this.cd = this.cd.add(1, 'day');
    this.returnEvent();
  }

  onDecrement() {
    this.cd = this.cd.subtract(1, 'day');
    this.returnEvent();
  }

  returnEvent() {
    this.currentDate = this.cd.format("MMMM DD, YYYY");
    this.dateSpinnerForm.controls['currentDate'].setValue(this.currentDate, { onlySelf: true });
    this.sr.spinValue = this.currentDate;
    this.onChanged.emit(this.sr)
  }
}
