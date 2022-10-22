import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService,  } from '../app-account.service';


@Component({
    selector: 'app-add-name',
    templateUrl: 'app-add-name.component.html',
    styleUrls: ['./app-add-name.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'add-name'
    }
})
export class AppAddNameComponent {
    userName = "";
    constructor(private service: AppAccountService, private _notification: NotificationService, private _ref: ChangeDetectorRef) {}

    submit() {
        return this.service.addData(this.userName);
    }

    cancel() {
        this.userName = "";
    }
}