import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInCallback } from '../../services/cognitoUtil.service';
import UserLoginService from '../../services/cognito.UserLogin.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export default class LogoutComponent implements LoggedInCallback {

  constructor(public router: Router) {
  }

  logout() {
    UserLoginService.isAuthenticated(this)
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      UserLoginService.logout();
      this.router.navigate(['/landing']);
    }

    this.router.navigate(['/landing']);
  }

}
