import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';



@Component({

  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private r: Router,
    private ls: LoginService
  ) { 

  }

  ngOnInit() {
  
  }

  cancel() {
    this.r.navigate(['/home'])
  }
  
  logout() {
    this.ls.logOutUser();
  }
}
