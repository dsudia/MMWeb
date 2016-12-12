import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './public/landing.component';
import { LegalComponent } from './public/legal.component';
import ConfirmRegistrationComponent from './public/auth/ConfirmComponent/confirm.component';
import LoginComponent from './public/auth/LoginComponent/login.component';
import MyProfileComponent from './secure/MyProfile/myProfile.component'
import RegisterSchoolComponent from './public/auth/RegisterComponent/registerSchool.component';
import RegisterTeacherComponent from './public/auth/RegisterComponent/registerTeacher.component';
import ResendCodeComponent from './public/auth/ResendComponent/resend.component'
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
