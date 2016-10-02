import { NgModule } from '@angular/core';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../home/login/login.component';
import { RegisterComponent } from '../home/register/register.component';
import { VerifyComponent } from '../home/verify/verify.component';
import { VerifyEmailComponent } from '../home/verifyEmail/verifyEmail.component';
import { ValidationService } from '../services/validation.service';
import { ForgotComponent } from '../home/login/forgot/forgot.component';
import { ForgotVerifyComponent } from './login/forgotVerify/forgotVerify.component';
import { ChangeComponent } from '../home/login/change/change.component';
import { ChallengeComponent } from '../home/login/challenge/challenge.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule }   from '../shared/shared.module';
import {routing} from './home.routing'


@NgModule({
    imports: [ SharedModule, routing],
    declarations: [ HomeComponent, LoginComponent, RegisterComponent, VerifyComponent, 
                   VerifyEmailComponent, ForgotComponent, ForgotVerifyComponent, 
                   ChangeComponent, ChallengeComponent, LogoutComponent ], 
    bootstrap: [ HomeComponent ],
    providers: [ ]

}) 

export class HomeModule {} 