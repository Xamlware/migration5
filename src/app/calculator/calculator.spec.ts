// /* tslint:disable:no-unused-variable */
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Calculator } from '../classes/calculator';
import { tick, fakeAsync } from '@angular/core/testing/fake_async';
import { inject, TestBed, getTestBed } from '@angular/core/testing/test_bed';

////////  SPECS  /////////////
import { User } from '../interfaces/user'
import { Measurement } from '../interfaces/measurement'
import { Physical } from '../interfaces/physical'
import { Calculation } from '../interfaces/calculation'
import { ActivityLevelType } from '../enums/activityLevelType.enum';
//import {CalculatorComponent} from '../classes/calculator.component';
import moment = require("moment");


describe('calculation unit tests male not metric', () => {

  // LOG: 'fat = 37.04958409789424'
  // LOG: 'lbm = 173.11364373079084'
  // LOG: 173.11364373079084
  // LOG: 'kmBmr = 2066.114807486656'
  // LOG: 'mjBmr = 2033.6418171096798'
  // LOG: 'mjBmr = 2033.6418171096798'
  // LOG: 'Bmr = 2049.8783122981677'
  // LOG: 'tdee = 2460'
  // LOG: 'fat = -15.824047692231773'

  var measurement: Measurement;
  var physical: Physical;
  var calculation: Calculation;

  //User = GetFatMaleTestingData();
  var user = new User();
  user.firstName = "john";
  user.lastName = "baird";
  user.dob = moment(new Date(1950, 7, 5)).format('MM/DD/YYYY');
  user.profileMetric = false;
  user.measurementMetric = false;
  user.recipeMetric = false;
  user.sex = "M";

  measurement = new Measurement();
  measurement.dateString = moment(new Date()).format('MM/DD/YYYY');
  
  physical = new Physical();

  physical.weight = 275;
  physical.height = 70;
  physical.hips = 28;
  physical.waist = 53;
  physical.neck = 19;
  physical.activityLevel = ActivityLevelType.sedentary;

  var fat = 37.04958409789424;
  var lbm = 78.52383367993778;
  if (user.profileMetric === false) {
    lbm = lbm * 2.2046;
  }
  var kmBmr = 2066.114807486656;
  var mjBmr = 2034;
  var bmr = 2050;
  var tdee = 2460;

  var calculation = new Calculation();

  var calculator: Calculator = new Calculator();

  describe('User class unit tests', () => {
    it('should calculate fat', () => {
      calculation.fat = calculator.calculateBodyFat(user, physical);
      expect(fat).toEqual(calculation.fat);
    });

    it('should calculate Lean body mass', () => {
      calculation.lbm = calculator.calculateLbm(user, physical, calculation);
      expect(lbm).toEqual(calculation.lbm);
    });

    it('should calculate Katch mcCardle bmr', () => {
      calculation.kmBmr = calculator.calculateKmBmr(user, calculation);
      expect(kmBmr).toEqual(calculation.kmBmr);
    });

    it('should calculate Mifflin St. Jeor bmr', () => {
      calculation.mjBmr = Math.round(calculator.calculateMjbmr(user, physical));
      expect(mjBmr).toEqual(calculation.mjBmr);
    });

    it('should calculate standard bmr', () => {
      calculation.bmr = Math.round(calculator.calculateBmr(user, physical, calculation));
      expect(bmr).toEqual(calculation.bmr);
    });

    it('should calculate tdee', () => {
      calculation.tdee = Math.round(calculator.calculateTdee(physical, calculation));
      expect(tdee).toEqual(calculation.tdee);
    });
  });
});

describe('calculation unit tests male metric', () => {
  var measurement: Measurement;
  var physical: Physical;
  var calculation: Calculation;

  //User = GetFatMaleTestingData();
  var user = new User();
  user.firstName = "john";
  user.lastName = "baird";
  user.dob = moment(new Date(1950, 7, 5)).format('MM/DD/YYYY');
  user.profileMetric = false;
  user.measurementMetric = true;
  user.recipeMetric = false;
  user.sex = "M";

  measurement = new Measurement();
  measurement.dateString = moment(new Date()).format('MM/DD/YYYY');
  user.profileMetric = false;

  physical = new Physical();

  physical.weight = 124.737902;
  physical.height = 1.778;
  physical.hips = 71.12;
  physical.waist = 134.62;
  physical.neck = 48.26;
  physical.activityLevel = ActivityLevelType.sedentary;

  var fat = 37.0495846531839;
  var lbm = 78.52302740390444;
  // if (user.profileMetric === false) {
  //   lbm = lbm * 2.2046;
  // }
  var kmBmr = 2066;
  var mjBmr = 2034;
  var bmr = 2050;
  var tdee = 2460;

  var calculation = new Calculation();

  var calculator: Calculator = new Calculator();

  it('should calculate fat', () => {
    calculation.fat = calculator.calculateBodyFat(user, physical);
    expect(fat).toEqual(calculation.fat);
  });

  it('should calculate Lean body mass', () => {
    calculation.lbm = calculator.calculateLbm(user, physical, calculation);
    expect(lbm).toEqual(calculation.lbm);
  });

  it('should calculate Katch mcCardle bmr', () => {
    calculation.kmBmr = Math.round(calculator.calculateKmBmr(user, calculation));
    expect(kmBmr).toEqual(calculation.kmBmr);
  });

  it('should calculate Mifflin St. Jeor bmr', () => {
    calculation.mjBmr = Math.round(calculator.calculateMjbmr(user, physical));
    expect(mjBmr).toEqual(calculation.mjBmr);
  });

  it('should calculate standard bmr', () => {
    calculation.bmr = Math.round(calculator.calculateBmr(user, physical, calculation));
    expect(bmr).toEqual(calculation.bmr);
  });

  it('should calculate tdee', () => {
    calculation.tdee = Math.round(calculator.calculateTdee(physical, calculation));
    expect(tdee).toEqual(calculation.tdee);
  });
});

