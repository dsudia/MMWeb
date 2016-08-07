import { Component } from '@angular/core';
import {RouteConfig} from "@angular/router-deprecated";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
    selector: 'my-app',
    template: '<h1>My Second Angular2 App<h1>'
})

export class AppComponent{
    title = 'Montessori Match';
}
