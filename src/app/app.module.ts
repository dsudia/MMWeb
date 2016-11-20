import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InformationComponent } from './public/information.component';
import { LandingComponent } from './public/landing.component';
import { LegalComponent } from './public/legal.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    LandingComponent,
    LegalComponent
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
