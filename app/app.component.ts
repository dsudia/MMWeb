import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>My Second Angular2 App<h1>'
})

export class AppComponent implements OnInit {
    title = 'Montessori Match';

    constructor() { }

    ngOnInit() {
        console.log('Initialized');
    }
}
