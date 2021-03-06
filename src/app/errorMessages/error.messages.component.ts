import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'kg-errorMessages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ErrorMessagesComponent {
  @Input() control: FormControl;
  @Input() name: string;

  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}