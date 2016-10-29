import {RouterModule, RouterLinkActive, RouterLink} from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';


@Injectable()
export class AppMenuService {
 
  constructor() {

  }

  getNoLoginMenu() {
    return [
      {
        label: 'Home',
        routerLink: ['']
      },  {
        label: 'Documents',
        routerLink: ['/document']
      }, {
        label: 'Calculator',
        routerLink: ['/calculator']
      }, {
        label: 'Verify',
        routerLink: ['/verify']
      }, {
        label: 'About',
        routerLink: ['/about']
      }];
  }

  getLoggedInMenu() {
    return [
      {
        label: 'Home',
        routerLink: ['']
      }, {
        label: 'Documents',
        routerLink: ['/document']
      }, {
        label: 'Food',
        routerLink: ['/food']
      }, {
        label: 'Calculator',
        routerLink: ['/calculator']
      }, {
        label: 'Settings',
        routerLink: ['/settings']
      }, {
        label: 'Themes',
        routerLink: ['/themes']
      }, {
        label: 'About',
        routerLink: ['/about']
      }, {
        label: 'Logout',
        routerLink: ['/logout']
        //command: (event: Event) => { this.onLogout() }
      }];
  }


}