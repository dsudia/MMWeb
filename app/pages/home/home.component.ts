import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    template: 'pages/home/home.html',
})

export class HomePage implements OnInit {
    title = 'Montessori Match';

    constructor() { }

    ngOnInit() {
        console.log('Initialized')
    }
}
