import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: 'app-about.component.html',
    styleUrls: ['./app-about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-about'
    }
})

export class AppAboutComponent {
    constructor() { }
}