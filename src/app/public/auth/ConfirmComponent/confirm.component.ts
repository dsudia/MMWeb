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
  username: string;
  errorMessage: string;
  private sub: any;
  router: Router;

  constructor(private configs: CognitoUtil,
              private regService: UserRegistrationService,
              router: Router,
              private route: ActivatedRoute) {
                this.router = router;
              }

  ngOnInit() {
    console.log(this.route.snapshot.params)
    this.username = this.route.snapshot.params['username']
    this.sub = this.route.params.subscribe(params => {})
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirmRegistration() {
    this.errorMessage = null;
    this.regService.confirmRegistration(this.username, this.confirmationCode, this);
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
