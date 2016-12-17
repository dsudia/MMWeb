import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { InformationComponent } from './public/information.component';
import { LandingComponent } from './public/landing.component';
import { LegalComponent } from './public/legal.component';
import ConfirmRegistrationComponent from './public/auth/ConfirmComponent/confirm.component';
import LoginComponent from './public/auth/LoginComponent/login.component';
import MyProfileComponent from './secure/MyProfile/myProfile.component';
import RegisterSchoolComponent from './public/auth/RegisterComponent/registerSchool.component';
import RegisterTeacherComponent from './public/auth/RegisterComponent/registerTeacher.component';
import ResendCodeComponent from './public/auth/ResendComponent/resend.component'

const landingRoutes: Routes = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'information',
        component: InformationComponent
    }
];

const authRoutes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'register-school',
      component: RegisterSchoolComponent
  },
  {
      path: 'register-teacher',
      component: RegisterTeacherComponent
  },
  {
      path: 'confirm/:username',
      component: ConfirmRegistrationComponent
  },
  {
      path: 'resendCode',
      component: ResendCodeComponent
  }
]

const secureRoutes: Routes = [
  {
    path: 'myprofile',
    component: MyProfileComponent
  }
]

const legalRoutes: Routes = [
    {
        path: 'legal',
        component: LegalComponent
    }
];

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            ...authRoutes,
            ...landingRoutes,
            ...legalRoutes,
            ...secureRoutes
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
