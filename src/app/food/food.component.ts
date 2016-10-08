import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';

// import { InputText, Checkbox, Dialog, Panel, Calendar, RadioButton, InputSwitch,
//   SelectButton, SelectItem, DataTable, Column, SplitButton, SplitButtonItem,
//   Button, Dropdown, Accordion, AccordionTab } from 'primeng/primeng'
import moment = require("moment");

@Component({
  moduleId: module.id,
  templateUrl: 'food.component.html',
  styleUrls: ['food.component.css']
})

export class FoodComponent implements OnInit {

  //string = new Date().toLocaleDateString();
  currentDate = moment(new Date()).format("ddd, MMM, YYYY");

  constructor(
    private ss: SettingsService,
    private r: Router ) {

  }

  ngOnInit() { }

  trackFood() {
    this.r.navigate(["/diary"]);
  }

  createRecipe() {
    this.r.navigate(["/recipe"]);
  }

  exportFood() {
    this.r.navigate(["/export"]);
  }

  settings() {
    this.r.navigate(["/foodSettings"])
  }
}
