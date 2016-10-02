import { RouterModule }  from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyEmailComponent } from './verifyEmail/verifyEmail.component';
import { RegisterComponent } from './register/register.component';
import { ChangeComponent } from './login/change/change.component';
import { ChallengeComponent } from './login/challenge/challenge.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { ForgotVerifyComponent } from './login/forgotVerify/forgotVerify.component';
import { LogoutComponent } from './logout/logout.component';

export const routing = RouterModule.forChild([
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'verifyEmail/:id', component: VerifyEmailComponent },
  { path: 'change', component: ChangeComponent },
  { path: 'forgot/:id', component: ForgotComponent },
  { path: 'verifyPassword/:id', component: ForgotVerifyComponent },
  { path: 'verifyUserName/:id', component: ForgotVerifyComponent },
  { path: 'logout', component: LogoutComponent }
]);

