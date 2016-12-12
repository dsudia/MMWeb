import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoCallback } from '../../../services/cognitoUtil.service'
import UserRegistrationService from '../../../services/cognito.UserRegistration.service'

@Component({
  selector: 'resend',
  templateUrl: './resend.html'
})
export default class ResendCodeComponent implements CognitoCallback {
  email: string;
  errorMessage: string;
  regService: UserRegistrationService;
  router: Router;

  constructor(registrationService: UserRegistrationService, router: Router) {
    this.regService = registrationService;
    this.router = router;
  }

  resendCode() {
    this.regService.resendCode(this.email, this)
  }

  cognitoCallback(error: any, result: any) {
    if (error !== null) {
      this.errorMessage = 'Something went wrong...please try again';
    } else {
      this.router.navigate(['/confirm', {username: this.email}]);
    }
  }
}
