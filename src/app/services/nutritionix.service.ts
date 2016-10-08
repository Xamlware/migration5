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

import { FoodSearchType } from '../enums/foodSearchType.enum';
import { NutritionixSearchRequest } from '../interfaces/nutritionixSearchRequest';
import { NutritionixSearchResults } from '../interfaces/nutritionix.search.results';

@Injectable()
export class NutritionixService {
    errorMessage: string
    constants: Constants = new Constants();

    constructor(private http: Http) {
    }

    //     doSearch(searchText: string, type: FoodSearchType) {
    //         //this.callSearchApi(Nut)
    //         var query = '"queries": { "item_name": "Taco", "brand_name": "Taco Bell"}"';
    //         var body = JSON.stringify(query);

    //         this.executeNxqlApiCall(body);

    //    }

    doNxqlSearch(nsr: NutritionixSearchRequest): Observable<NutritionixSearchResults> {
        if (nsr.sort != null) {

        }

        return this.executeNxqlApiCall(nsr);
    }

    callSearchApi(searchType: string, searchValue: string, searchBrand?: string) {
        searchValue = searchValue.replace(" ", "%20");
        var headers = new Headers();
        var searchString: string;
        var type: string;

        headers.append("content-type", this.constants.jsonContentType);

        switch (searchType) {
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
        var itemUri = this.constants.nutritionUrl + "item/" + itemType + "/" + itemValue;

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
        var offsetString = offset > 0 ? "&offset=" + offset : "";
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
        headers.append("Authorization", "Bearer " + s);

        return this.http.get(uri, { headers: headers })
            .map(res => res.json())
    }

    executeNxqlApiCall(nsr: NutritionixSearchRequest): Observable<NutritionixSearchResults> {
        var headers = new Headers();
        headers.append("content-type", this.constants.jsonContentType);

        // var body = JSON.stringify(nsr)
        // console.log(body);
        var test = { "appId": "5206fdc5", "appKey": "c59eecf5a70336bff3b32af27fec5c0d", "query": "taco bell", "fields": ["item_name", "brand_name", "nf_calories", "nf_serving_size_qty", "nf_serving_size_unit"], "sort": { "field": "_score", "order": "desc" }, "filters": { "item_type": 2 } };
        //var body = {"appId":"5206fdc5","appKey":"c59eecf5a70336bff3b32af27fec5c0d","query":"taco bell","fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit"]};
        var req = JSON.stringify(nsr);

        console.log(req);
        console.log(this.constants.nutritionixApiUrl);

        return this.http.post(this.constants.nutritionixApiUrl, req, { headers: headers })
            .map(res => <NutritionixSearchResults>res.json())
        
        // return this.http.post(this.constants.nutritionUrl + "nxqlSearch", req, { headers: headers })
        //     .map(res => <NutritionixSearchResults> res.json())
    }

    //     executeNxqlApiCall(nsr: NutritionixSearchRequest) : Observable<NutritionixSearchResults> {
    //     var headers = new Headers(); 
    //     headers.append("content-type", this.constants.jsonContentType);

    //     // var body = JSON.stringify(nsr)
    //     // console.log(body);
    //     var test = {"appId":"5206fdc5","appKey":"c59eecf5a70336bff3b32af27fec5c0d","query":"taco bell","fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit"],"sort":{"field":"_score","order":"desc"},"filters":{"item_type":2}};
    //     //var body = {"appId":"5206fdc5","appKey":"c59eecf5a70336bff3b32af27fec5c0d","query":"taco bell","fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit"]};
    //     var req = JSON.stringify(test);

    //     console.log(req);
    //     console.log(this.constants.nutritionUrl + "nxqlSearch");

    //     return this.http.post(this.constants.nutritionixApiUrl, req, { headers: headers })
    //         .map(res => <NutritionixSearchResults> res.json())
    // }
}
