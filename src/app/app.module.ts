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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
