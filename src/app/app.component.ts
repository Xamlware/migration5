import {  Component, OnInit, HostListener } from '@angular/core';

import { AppMenuService } from './services/appMenu.service';
import { LoginService } from './services/login.service';
import { SettingsService } from './services/settings.service';
import { ThemeService } from './services/theme.service';
import { Theme } from './interfaces/theme';
import { User } from './interfaces/user';
import { LoggedIn } from './interfaces/loggedIn';
import { Menubar, MenuItem, Button } from 'primeng/primeng'

@Component({
    selector: 'kg-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
    private items: MenuItem[];
    appPageHeaderDivStyle: {};
    selectedTheme: Theme;
    errorMessage: string;
    loggedIn: LoggedIn; 
    loggedInEmail: string = "";
    isLoggedIn: boolean;

    constructor(
        private as: AppMenuService,
        private ts: ThemeService,
        private ss: SettingsService,
        private ls: LoginService) {
    }

    // @HostListener('window:unload', ['$event'])
    // unloadHandler(event) {
    // }

    // @HostListener('window:beforeunload', ['$event'])
    // beforeUnloadHander(event) {
    //     this.onShutdown;
    // }

    ngOnInit() {

        this.ts.getNewTheme()
            .subscribe(
            theme => this.selectedTheme = theme,
            error => {
                this.errorMessage = error
            },
            () => this.completeGetNewTheme()
            );

        this.ts.setTheme("Pepper-Grinder");
        this.items = this.as.getNoLoginMenu();

        this.ls.getLoggedIn()
            .subscribe(
            loggedIn => {
                if (loggedIn.error != undefined && loggedIn.error === "" && loggedIn.email != "") {
                    this.items = this.as.getLoggedInMenu();

                    var us = this.ss.getUserSettings();
                    if (us != undefined && us.theme != null && us.theme != "") {
                        this.ts.setTheme(us.theme);
                    }

                    
                }
                else {
                    this.items = this.as.getNoLoginMenu();
                    this.ts.setTheme("Pepper-Grinder");
                }

                this.completeLoggedIn(loggedIn.email);
            });
    }

    completeLoggedIn(email: string) {
        this.loggedInEmail = email;
        this.isLoggedIn = (this.loggedInEmail.length > 0);
       
        // this.as.getIsLogout()
        //     .subscribe(
        //     logout => {
        //         debugger;
        //         if (logout) {
        //             this.items = this.as.getNoLoginMenu();
        //         }
        //     });
    }

    completeGetNewTheme() {
        this.appPageHeaderDivStyle = this.ts.getAppPageHeaderDivStyle();
    }

    onShutdown() {
        alert("shutting down");
        this.ss.updateProfileInformation(this.ss.getUserSettings());
    }

    onLogout() {

    }
}
