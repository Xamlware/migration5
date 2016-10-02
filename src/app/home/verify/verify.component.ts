import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Button, Panel } from 'primeng/primeng';
import { SettingsService } from '../../services/settings.service';



@Component({
    templateUrl: 'verify.component.html',
    styleUrls: ['verify.component.css']
})

export class VerifyComponent {
    emailAddress: string = "";

    constructor(
        private router: Router,
        private ss: SettingsService) {

        var us = this.ss.getUserSettings();
        if (us) {
            if (this.emailAddress != "") {
                this.emailAddress = this.ss.getUserSettings().emailAddress;
            } else {
                this.emailAddress = localStorage.getItem("email");
            }
        }
    }

    close() {
        this.router.navigate(["/home"]);
    }

}


