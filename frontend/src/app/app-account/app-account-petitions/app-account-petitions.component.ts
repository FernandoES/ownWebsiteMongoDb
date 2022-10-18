import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService, Petition } from '../app-account.service';


@Component({
    selector: 'app-account-petitions',
    templateUrl: 'app-account-petitions.component.html',
    styleUrls: ['./app-account-petitions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'account-petitions'
    }
})
export class AppAccountPetitionsComponent implements OnInit {
    petitions: Petition[];
    constructor(private service: AppAccountService, private _notification: NotificationService, private _ref: ChangeDetectorRef) { }

    ngOnInit() { 
        this.service.fetchAccountPetitions().subscribe(petitions => {
            this.petitions = petitions.accountPetitions;
            this._ref.markForCheck();
    });
    }

    acceptPetition(petition: Petition) {
        this.service.acceptPetition(petition._id).subscribe(response => 
            {
                this._notification.success(response.status);
                this.petitions = this.petitions.filter(p => p._id !== petition._id);
                this._ref.markForCheck();
            },
            error => this._notification.error(error)
        );
    }

    rejectPetition(petition: Petition) {
        this.service.rejectPetition(petition._id).subscribe(response => 
            {
                this._notification.success(response.status);
                this.petitions = this.petitions.filter(p => p._id !== petition._id);
                this._ref.markForCheck();
            },
            error => this._notification.error(error)
        );
    }
}