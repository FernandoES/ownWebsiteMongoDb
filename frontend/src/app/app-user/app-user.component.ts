import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: 'app-user.component.html',
    styleUrls: ['./app-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
      class: 'app-user'
    }
})

export class AppUserComponent {
    constructor() { }
}