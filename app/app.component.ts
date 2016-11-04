import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/User/userService';

@Component({
    selector: 'my-app',
    template: '<h1>My Second Angular2 App<h1>',
    providers: [UserService]
})

export class AppComponent implements OnInit {
    title = 'Montessori Match';

    constructor(private UserService: UserService) { }

    ngOnInit() {
        console.log('Initialized');
    }
}
