import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account.service';

@Component({
    selector: 'app-logout',
    templateUrl: 'app-logout.component.html',
    styleUrls: ['app-logout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-logout'
    }
})

export class AppLogoutComponent {
    constructor(private service: AppAccountService, private notification: NotificationService) {}
    logout() {
        this.service.logout().subscribe(response => {
            this.notification.success(response.status)
        });
    }
}