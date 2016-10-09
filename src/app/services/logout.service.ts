import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogoutService {
  private logout$: Subject<boolean>;

  constructor() {
    console.log("logout service constructor");
    this.logout$ = <Subject<boolean>>new Subject();
  }

  ngOnInit() {
    console.log("logout service init ");
  }

  setLogout(logout: boolean): void {
    this.logout$.next(logout);
  }

  getLogout(): Observable<boolean> {
    console.log("getting logout observable")
    return this.logout$.asObservable();
  }
}

