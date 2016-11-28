import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './public/landing.component';
import { LegalComponent } from './public/legal.component';
import LoginComponent from './public/auth/LoginComponent/login.component';
import RegisterSchoolComponent from './public/auth/RegisterComponent/registerSchool.component';
import RegisterTeacherComponent from './public/auth/RegisterComponent/registerTeacher.component';
import AWSUtil from './services/aws.service'
import { CognitoUtil } from './services/cognitoUtil.service'
import UserLoginService from './services/cognito.UserLogin.service'
import UserParametersService from './services/cognito.UserParameters.service'
import UserRegistrationService from './services/cognito.UserRegistration.service'
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LegalComponent,
    LoginComponent,
    RegisterSchoolComponent,
    RegisterTeacherComponent
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
