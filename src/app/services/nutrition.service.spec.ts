// /* tslint:disable:no-unused-variable */
// import {
//   expect, it, iit, xit,
//   describe, ddescribe, xdescribe,
//   beforeEach, beforeEachProviders, withProviders,
//   async, inject
// } from '@angular/core/testing';

// import {Http, HTTP_PROVIDERS, Response, Headers } from '@angular/http';
// import { TestComponentBuilder } from '@angular/compiler/testing';

// import { By }             from '@angular/platform-browser';
// import { provide }        from '@angular/core';
// import { ViewMetadata }   from '@angular/core';
// import { PromiseWrapper } from '@angular/core/src/facade/promise';


// ////////  SPECS  /////////////
// import {NutritionixService} from '../services/nutritionix.service';
// import {ActivityLevelType} from '../enums/activityLevelType.enum';
// import {NutritionixSearchResults} from '../interfaces/nutritionix.search';

// // Delete this
// describe('nutritionix api tests', () => {

//   beforeEachProviders(() => {
//     return [
//       HTTP_PROVIDERS, NutritionixService
//     ];
//   }); 

//   var apiSearchResults: NutritionixSearchResults;

//   it('should return search for an item', inject([NutritionixService], (nutritionixService: NutritionixService) => {
//     // callSearchApi(searchType: string, searchValue: string) {
//     //   var type: string = (searchType == "brand" ? "brand_id" : "phrase");
//     nutritionixService.callSearchApi("phrase", "taco")
//       .subscribe(
//       apiResults => this.apiSearResults = apiResults,
//       error => this.errorMessage = <any>error);

//     expect(this.apiSearchResults).toBeDefined();
//     console.log(this.apiSearchResults);

//   }));
// });