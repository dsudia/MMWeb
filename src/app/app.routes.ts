import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { InformationComponent } from './public/information.component';
import { LandingComponent } from './public/landing.component';
import { LegalComponent } from './public/legal.component';

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
            ...landingRoutes,
            ...legalRoutes
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes); 