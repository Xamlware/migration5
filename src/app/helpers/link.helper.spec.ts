// /* tslint:disable:no-unused-variable */
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Calculator } from '../classes/calculator';
import { tick, fakeAsync } from '@angular/core/testing/fake_async';
import { inject, TestBed, getTestBed } from '@angular/core/testing/test_bed';

////////  SPECS  /////////////
import { LinkHelper } from '../helpers/link.helper';
import { Guid } from '../helpers/math.helper';
import { VerifyAdmin } from '../interfaces/verifyAdmin';
// import { User } from '../interfaces/user'
// import { Measurement } from '../interfaces/measurement'
// import { Physical } from '../interfaces/physical'
// import { Calculation } from '../interfaces/calculation'
// import { ActivityLevelType } from '../enums/activityLevelType.enum';
//import {CalculatorComponent} from '../classes/calculator.component';
import * as moment from "moment";

// describe('Link Helper Unit Tests', () => {
//   var adminLink = Guid.MakeNew().ToString();
//   var curDate = moment().format("MM/dd/yyyy");
//   var fillLink =   Guid.MakeNew().ToString();
//   var task = "Ketor~~~F5E18A10-AF5F-B2F5-B2F5-B2F5E18A103F~~~Test123~~~jbaird@ketogeniq.com/"
//   var val = new VerifyAdmin("", "", "", "", "");


//   it('should decrypt link back to parts', () => {
//     var link = LinkHelper.encryptAdminLink(task, adminLink);
//     var dLink = LinkHelper.decryptAdminLink(link);
//     expect(dLink.id).toEqual(adminLink);
//     expect(dLink.id2).toEqual(fillLink);
//     expect(dLink.task).toEqual(task);
//     expect(dLink.date).toEqual(curDate);
    
//   });
// });
