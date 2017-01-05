import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InformationComponent } from './public/information/information.component';
import { LandingComponent } from './public/landing/landing.component';
import { LegalComponent } from './public/legal/legal.component';
import ConfirmRegistrationComponent from './public/auth/confirm/confirm.component';
import LoginComponent from './public/auth/login/login.component';
import MyProfileComponent from './secure/my-profile/my-profile.component'
import RegisterSchoolComponent from './public/auth/register/register-school.component';
import RegisterTeacherComponent from './public/auth/register/register-teacher.component';
import ResendCodeComponent from './public/auth/resend/resend.component'
import AWSUtil from './services/aws.service'
import { CognitoUtil } from './services/cognitoUtil.service'
import UserLoginService from './services/cognito.UserLogin.service'
import UserParametersService from './services/cognito.UserParameters.service'
import UserRegistrationService from './services/cognito.UserRegistration.service'
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmRegistrationComponent,
    InformationComponent,
    LandingComponent,
    LegalComponent,
    LoginComponent,
    MyProfileComponent,
    RegisterSchoolComponent,
    RegisterTeacherComponent,
    ResendCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    UserRegistrationService,
    UserLoginService,
    UserParametersService,
    CognitoUtil,
    AWSUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
