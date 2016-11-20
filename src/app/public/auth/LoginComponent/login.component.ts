import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import UserLoginService from '../../../services/cognito.UserLogin.service'
import { CognitoCallback, CognitoUtil, LoggedInCallback } from '../../../services/cognitoUtil.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.html'
})
export default class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
    email: string;
    password: string;
    errorMessage: string;
    router: Router;
    configs: CognitoUtil;

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['/myprofile']);
        }
    }

    constructor(configs: CognitoUtil, router: Router) {
        console.log('LoginComponent constructor');
        this.configs = configs;
        this.router = router;
    }

    ngOnInit() {
        this.errorMessage = null;
        console.log('Checking if the user is already authenticated; if so, redirect to secure site.');
        UserLoginService.isAuthenticated(this);
    }

    onLogin() {
        if (this.email === null || this.password === null) {
            this.errorMessage = 'All fields are required';
            return;
        }
        this.errorMessage = null;
        UserLoginService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message !== null) {
            this.errorMessage = message;
            console.log(`error: ${this.errorMessage}`);
        } else {
            this.router.navigate(['/myprofile']);
        }
    }
}
