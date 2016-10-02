import {Component, OnInit, Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
//import cypto-js = require("crypto-js");

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';


@Injectable()
export class EncryptionService {
  // key:any = CryptoJS.enc.Base64.parse("#base64Key#");
  // iv:any  = CryptoJS.enc.Base64.parse("#base64IV#");


  // encrypt(text: string) {
  //     var encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv});
  //   console.log(encrypted.toString());
  // }

  // decrypt() {

  //   var decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});
  //   console.log(decrypted.toString(CryptoJS.enc.Utf8));


  // }

}