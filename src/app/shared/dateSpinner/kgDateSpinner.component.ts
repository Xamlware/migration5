import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateSpinnerReturn } from '../../interfaces/dateSpinnerReturn';
import { Theme } from '../../interfaces/theme';
import { User } from '../../interfaces/user';
import { Round } from '../../helpers/math.helper';
import { FindHelper } from '../../helpers/find.helper';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import * as moment from "moment";
import { Calendar } from 'primeng/primeng'


@Component({

  selector: 'kg-dateSpinner',
  templateUrl: 'kgDateSpinner.component.html',
  styleUrls: ['kgDateSpinner.component.css']
})

export class KgDateSpinnerComponent implements OnInit, AfterContentInit {
  @Output() onChanged = new EventEmitter<DateSpinnerReturn>();
  @Output() onLoadFood = new EventEmitter<DateSpinnerReturn>();

  sr: DateSpinnerReturn;
  userSettings: User;
  cd = moment();
  currentDate: Date; //string = this.cd.format("MMMM DD, YYYY");;
  dateSpinnerForm: FormGroup;
  isLoadFoodEnabled: boolean;

  constructor(
    private ts: ThemeService,
    private fb: FormBuilder,
    private ss: SettingsService) {

    this.sr = new DateSpinnerReturn();
  }


  ngOnInit() {
    this.currentDate = this.cd.toDate();
    this.dateSpinnerForm = this.fb.group({
      currentDate: ['', []]
    });


    this.isLoadFoodEnabled = this.checkFoodDate()
  }

  ngAfterContentInit() {
    console.log("setting date : ", this.currentDate)
    this.dateSpinnerForm.controls['currentDate'].setValue(this.currentDate, { onlySelf: true });
  }


  onLoadFoodRequest() {
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

  checkFoodDate(): boolean {
    var fd = this.ss.getUserSettings().foodDates;
    var ok = FindHelper.findFoodDate(this.cd.toDate(), fd);
    return ok;
  }

  returnEvent() {
    this.isLoadFoodEnabled = this.checkFoodDate();
    this.currentDate = this.cd.toDate(); //.format("MMMM DD, YYYY");
    this.dateSpinnerForm.controls['currentDate'].setValue(this.currentDate, { onlySelf: true });
    this.sr.spinValue = this.currentDate;
    this.onChanged.emit(this.sr)
  }
}
