import {Component, OnInit, Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../constants/http.constants';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout'; 
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

@Injectable()
export class NutritionixService {
    errorMessage: string
    constants: Constants = new Constants();
    
    constructor(private http: Http) {
    }

    callSearchApi(searchType: string, searchValue: string, searchBrand?: string) {
        searchValue = searchValue.replace(" ", "%20");
        var headers = new Headers();
        var searchString: string;
        var type: string;
    
        headers.append("content-type", this.constants.jsonContentType);
        
        switch(searchType)
        {
            case "brand": {
                type = "brand_id";
                break;
            }
            case "phrase": {
                type = "phrase";
                break;
            }
            case "brandPhrase": {
                type = "brand_id"
                break;
            }

 
        }

        var searchUri = this.constants.nutritionUrl + "search/" + type + "/" + searchValue + "/" + searchBrand;

        return this.executeApiCall(searchUri);
    }


    callItemApi(itemType: string, itemValue: string) {
        var type: string = (itemType == "upc" ? "upc" : "id");
        var itemUri = this.constants.nutritionUrl + "item/" + itemType +"/" + itemValue; 
 
        return this.executeApiCall(itemUri);
    }


    callBrandApi(itemValue: string) {
        itemValue = itemValue.replace(" ", "%20")
        var brandUri = this.constants.nutritionUrl + "brand/" + itemValue;

        return this.executeApiCall(brandUri);
    }

    callBrandSearchApi(searchPhrase: string, auto: boolean, type: number, paged: boolean, offset: number, itemsPerPage: number) {
        var auto: boolean;
        var type: number; //1 = restraunts, 2 = food manufac.
        var minScore: number = 1;
        var offset: number; //paging offset
        var limit: number = 20; //num items/page
        var offsetString = offset > 0 ? "&offset="+offset : "";
        searchPhrase = searchPhrase.replace(" ", "+");

        var brandUri = this.constants.nutritionUrl + "brand/search/" + searchPhrase + "/" + auto + "/" + type + "/" + minScore + "/" +
                       offsetString + "/" + limit + "/" + itemsPerPage

        return this.executeApiCall(brandUri);

       //"https://api.nutritionUrlix.com/v1_1/brand/search?query=just+salad&auto=true&type=1&min_score=1&limit=20&appId=5206fdc5&appKey=c59eecf5a70336bff3b32af27fec5c0d"
    }

    executeApiCall(uri: string) {
        var headers = new Headers();
        headers.append("content-type", this.constants.jsonContentType);

        var s = localStorage.getItem("accessToken");
        headers.append("Authorization",  "Bearer " + s);

        return this.http.get(uri, { headers: headers })
            .map(res => res.json())
    }
}
