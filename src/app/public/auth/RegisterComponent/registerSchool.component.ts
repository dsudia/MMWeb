import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as uuid from 'uuid'
import UserRegistrationService from '../../../services/cognito.UserRegistration.service'
import { CognitoCallback, CognitoUtil } from '../../../services/cognitoUtil.service';
import { RegistrationUser } from '../../../types/classes'

/**
 * This component is responsible for displaying and controlling
 * the registration of the user
 */
@Component({
  selector: `app-register`,
  templateUrl: './register-school.html'
})
export default class RegisterSchoolComponent implements CognitoCallback {
  registrationUser: RegistrationUser;
  router: Router;
  errorMessage: string
  userRegistration: UserRegistrationService

  constructor(configs: CognitoUtil, userRegistration: UserRegistrationService, router: Router) {
    this.router = router;
    this.userRegistration = userRegistration;
    this.onInit();
  }

  onInit() {
    const id = uuid()
    this.registrationUser = new RegistrationUser(false, id, `school`);
    this.errorMessage = null;
  }

  onRegister() {
    this.errorMessage = null;
    this.userRegistration.register(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message !== null) {
      this.errorMessage = message;
      console.log(`result: ${this.errorMessage}`)
    } else {
      console.log(`redirecting`)
      this.router.navigate([`/myprofile`], result.user.username)
    }
  }
}
