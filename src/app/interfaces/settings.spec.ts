// /* tslint:disable:no-unused-variable */
// import {
//   expect, it, iit, xit,
//   describe, ddescribe, xdescribe,
//   beforeEach, beforeEachProviders, withProviders,
//   async, inject
// } from '@angular/core/testing';

// import { TestComponentBuilder } from '@angular/compiler/testing';

// import { By }             from '@angular/platform-browser';
// import { provide }        from '@angular/core';
// import { ViewMetadata }   from '@angular/core';
// import { PromiseWrapper } from '@angular/core/src/facade/promise';
// import {Http} from '@angular/http';

// ////////  SPECS  /////////////
// import {User} from './user';
// import {Measurement} from './measurement';
// import {Physical} from './physical';
// import {Calculation} from './calculation';
// import {CalculationService} from '../components/calculator/calculation.service';
// import {MockCalculationService} from '../testingData/mock.calculation.service';
// import {MockSettingsService} from '../testingData/mock.settings.service';

// import {ActivityLevelType} from '../enums/activityLevelType.enum';

// /// Delete this
// describe('User class unit tests', () => {
//     var measurement: Measurement;  
//     var measurementData: Measurement[] = [];
//     var calculation: Calculation;
//     var calculationData: Calculation[] = []; 
//     var physical: Physical;
//     var physicalData: Physical[] = [];

//     var mockCalculationService: MockCalculationService;
//     var mockSettingsService: MockSettingsService = new MockSettingsService();  
//     //User = GetFatMaleTestingData();
    
//     measurement = new Measurement();
//     measurement.dateString = new Date().toLocaleDateString();
//     measurementData.push(measurement);

//     calculation = new Calculation();
  
//     calculationData.push(calculation);


//     physical = new Physical();
//     physical.weight = 275;
//     physical.height = 70;
//     physical.hips =  28;
//     physical.waist = 53;
//     physical.neck = 19;
//     physical.activityLevelAsString = "sedentary";
//     physical.activityLevel = ActivityLevelType.sedentary;
//     physicalData.push(physical);

//     var user = new User();
//     user.firstName = "john";
//     user.lastName = "baird"
//     user.dob = "7/5/1950";
//     user.measurementMetric = false;
//     user.sex = "M";
//     user.calculationData = calculationData;
//     user.measurementData = measurementData;
//     user.physicalData = physicalData;


//     var fat = 37.04958409789424;
//     var lbm = 78.52383367993778;
//     if(user.measurementMetric === false) {
//         lbm = lbm * 2.2046; 
//     }
//     var kmBmr = 2066;
//     var mjBmr = 2034;
//     var bmr = 2050; 
//     var tdee = 2706; 

//     mockSettingsService.setUserSettings(user);
//     mockCalculationService = new MockCalculationService(mockSettingsService);

//   it('should calculate fat', () => {
//     calculation.fat = mockCalculationService.calculator.calculateBodyFat(user, physical);
//     expect(fat).toEqual(mockCalculationService.calculator.calculateBodyFat(user, physical));
//     expect(calculation.fat).toEqual(fat);
//   });
  
//   it('should calculate Lean body mass', () => {
//     calculation.lbm = mockCalculationService.calculator.calculateLbm(user, physical, calculation);
//     expect(lbm).toEqual(mockCalculationService.calculator.calculateLbm(user, physical, calculation));
//     expect(calculation.lbm).toEqual(lbm);
//     expect(calculation.fat).toEqual(fat);
//   });
  
//   it('should calculate Katch mcCardle bmr', () => {
//     calculation.kmBmr = Math.round(mockCalculationService.calculator.calculateKmBmr(user, calculation));
//     expect(kmBmr).toEqual(Math.round(mockCalculationService.calculator.calculateKmBmr(user,calculation)));
//     expect(calculation.kmBmr).toEqual(kmBmr);
//   });
  
//   it('should calculate Mifflin St. Jeor bmr', () => {
//     calculation.mjBmr = Math.round(mockCalculationService.calculator.calculateMjbmr(user, physical));
//     expect(mjBmr).toEqual(Math.round(mockCalculationService.calculator.calculateMjbmr(user, physical)));
//     expect(calculation.mjBmr).toEqual(mjBmr);
//   });
   
//   it('should calculate standard bmr', () => {
//     calculation.bmr = Math.round(mockCalculationService.calculator.calculateBmr(user, physical, calculation));
//     expect(bmr).toEqual(Math.round(mockCalculationService.calculator.calculateBmr(user, physical, calculation)));
//     expect(calculation.bmr).toEqual(bmr);
//   }); 

//   it('should calculate tdee based on bmr and digestion', () => {
//     calculation.tdee = Math.round(mockCalculationService.calculator.calculateTdee(physical, calculation));
//     console.log('tdee = ' + calculation.tdee);
//     expect(tdee).toEqual(Math.round(mockCalculationService.calculator.calculateTdee(physical, calculation)));
//     expect(calculation.tdee).toEqual(tdee);
//   });
  
  
// });