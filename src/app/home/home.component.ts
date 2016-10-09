import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ThemeService } from '../services/theme.service';
import { SettingsService } from '../services/settings.service';
import { LoggedIn } from '../interfaces/loggedIn';
import { Galleria, Panel, Button } from 'primeng/primeng'
import { User } from '../interfaces/user';
import { LocalUser } from '../interfaces/localUser';
import { LinkHelper } from '../helpers/link.helper';
import { FoodDashboardComponent } from '../shared/foodDashboard/food.dashboard.component';


@Component({
    
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    display: boolean = false;
    selectedDivBorderStyle: {};
    images: any[];
    userSettings: User = new User();
    errorMessage: string;
    localUser: LocalUser = new LocalUser("", "", "");
    isLoggedIn: boolean;

    constructor(private themeService: ThemeService,
        private settingsService: SettingsService,
        private router: Router,
        private ls: LoginService) {

        this.images = [];
        this.images.push({ source: 'app/resources/broccoli.jpg', alt: 'Broccoli', title: '' });
        this.images.push({ source: 'app/resources/coconut.jpg', alt: 'Coconut', title: '' });
        this.images.push({ source: 'app/resources/saturatedOil.jpg', alt: 'Saturated Oils', title: '' });
    }


    ngOnInit() {
        this.selectedDivBorderStyle = this.themeService.getAppPageHeaderDivStyle();

        this.isLoggedIn = this.ls.isLoggedIn;
        if (!this.isLoggedIn) {
            this.clearUserSettings();
        }
    }

    clearUserSettings() {
        this.userSettings = new User();
    }

    decryptEmail() {
        //this.ls.decryptEmail();
    }

    handleError(error: any) {
        console.log(error);
    }
    completeDataGet() {
        this.settingsService.setUserSettings(this.userSettings);
    }

    register() {
        this.router.navigate(['/register']);
    }


    login() {
        this.router.navigate(['/login']);
    }

    testLink() {
        var s = LinkHelper.encryptString("12345"); //~~~link~~~Test123~~~me@mytestbed.com/", "5B6F2F44-C729-E3FD-91A8-12BE1D244375")
        console.log(s);
        var d = LinkHelper.decryptAdminLink(s);
    }
} 
