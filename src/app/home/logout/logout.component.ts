import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LogoutService } from '../../services/logout.service';


@Component({
  
  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private r: Router,
    private ls: LoginService,
    private los: LogoutService
  ) { 

  }

  ngOnInit() {
  
  }

  cancel() {
    this.r.navigate(['/home'])
  }
  
  logout() {
    this.los.setLogout(true);
  }
}
