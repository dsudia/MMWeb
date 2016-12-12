import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CognitoUtil } from '../../../services/cognitoUtil.service';
import UserRegistrationService from '../../../services/cognito.UserRegistration.service';

@Component({
  selector: 'confirm-registration',
  templateUrl: './confirm.html'
})
export default class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  confirmationCode: string;
  email: string;
  errorMessage: string;
  private sub: any;
  route: ActivatedRoute;
  regService: UserRegistrationService;
  router: Router
  configs: CognitoUtil

  constructor(configs: CognitoUtil, regService: UserRegistrationService, router: Router, route: ActivatedRoute) {
    this.route = route;
    this.regService = regService;
    this.router = router;
    this.configs = configs;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {
    this.errorMessage = null;
    this.regService.confirmRegistration(this.email, this.confirmationCode, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message !== null) {
      this.errorMessage = message;
      console.log(`message: ${this.errorMessage}`);
    } else {
      console.log('Moving to login')
      this.router.navigate(['/login'])
    }
  }
}
