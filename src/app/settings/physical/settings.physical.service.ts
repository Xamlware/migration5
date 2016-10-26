import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

import { Physical } from '../../interfaces/physical';
import { ActivityLevelType } from '../../enums/activityLevelType.enum';
import { DataResponseObject } from '../../interfaces/dataResponseObject';
import { PhysicalFactory } from '../../factories/physical.factory';
import { MeasurementFactory } from '../../factories/measurement.factory';
import { SettingsService } from '../../services/settings.service';
import { Constants } from '../../constants/http.constants';
import { FindHelper } from '../../helpers/find.helper';

@Injectable()
export class SettingsPhysicalService {
  constants: Constants = new Constants();
  private isPhysicalSaved$: Subject<boolean>;
  errorMessage: string
  statusMessage: string;
  dro: DataResponseObject;

  constructor(private router: Router,
    private http: Http,
    private ss: SettingsService) {
    this.isPhysicalSaved$ = <Subject<boolean>>new Subject();
  }

  updatePhysicalData(value: Physical) {

    var p: Physical = new PhysicalFactory().updateNewPhysical(value, this.ss.getUserSettings());
    var headers = new Headers();
    headers.append('Content-Type', this.constants.jsonContentType);

    var s = localStorage.getItem("accessToken");
    headers.append("Authorization", "Bearer " + s);
    var body = JSON.stringify(p);

    this.http.post(this.constants.userUrl + "UpdatePhysical", body, { headers: headers })
      .map((response: Response) => {
        var result = <DataResponseObject>response.json();
        return result;
      })
      .catch(this.handleError)
      .subscribe(
      dro => this.dro = dro,
      error => this.errorMessage = error,
      () => this.completeAddPhysical()
      );
  }

  completeAddPhysical() {
    console.log("in add phys");
    if (this.dro) {
      if (this.dro.data.length > 1) {
        var dateString = this.dro.data[0].dateString
        var m = FindHelper.FindMeasurementByDate(dateString, this.ss.getUserSettings())
        if (m === null || m === undefined) {
          this.ss.getUserSettings().measurementData.push(new MeasurementFactory().createMeasurement(this.dro.data[0]));
        }

        var p = FindHelper.FindPhysicalByDate(dateString, this.ss.getUserSettings())
        if (p === null || p === undefined) {
          this.ss.getUserSettings().physicalData.push(new PhysicalFactory().createPhysical(this.dro.data[1], this.ss.getUserSettings()));
        }
      } else {
        this.updatePhysicalRecord(this.dro[0]);
      }

      this.setIsPhysicalSaved(true);
    }
  }

  updatePhysicalRecord(p: Physical) {
    var us = this.ss.getUserSettings();
    var rec: Physical;
debugger;
    if ( p != null && p != undefined && p.fK_Measurement != undefined && p.fK_Measurement != 0) {
      rec = FindHelper.FindPhysicalByKey(p.fK_Measurement, us);
    }

    if (rec == null) {
      rec = new Physical();
    }

    rec.pK_Physical = p.pK_Physical;
    rec.fK_Measurement = p.fK_Measurement;
    rec.dateString = p.dateString;
    rec.type = p.type;
    rec.weight = p.weight;
    rec.height = p.height;
    rec.hips = p.hips;
    rec.waist = p.waist;
    rec.neck = p.neck;
    rec.activityLevel = p.activityLevel;
    rec.activityLevelAsString = ActivityLevelType[p.activityLevel];
    rec.userEmail = this.ss.getUserSettings().emailAddress;
  }

  private handleError(error: Response) {
    console.error(error); // log to console instead
    return Observable.throw(error.json().error || 'Server Error');
  }

  setIsPhysicalSaved(isPhysicalSaved: boolean) {
    this.isPhysicalSaved$.next(isPhysicalSaved);
  }

  getIsPhysicalSaved(): Observable<boolean> {
    return this.isPhysicalSaved$.asObservable();
  }
}
