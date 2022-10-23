import { Component, OnInit } from '@angular/core';
import { Observable, filter, map, Subject } from 'rxjs';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../../app-account/app-account.service';
import { AppSuggestionsListService } from '../app-suggestions-list/app-suggestions-list.service';

@Component({
    selector: 'app-single-suggestion',
    templateUrl: 'app-single-suggestion.component.html'
})

export class AppSingleSuggestion implements OnInit {
    error$ = new Subject<string>();
    public singleSuggestion$: Observable<IBlogEntry>;
    constructor(public service: AppSuggestionsListService, public accountService: AppAccountService, private _notificationService: NotificationService) { }

    ngOnInit() {
        this.singleSuggestion$ = this.service.selectedSuggestion.asObservable().pipe(
            filter(suggestion => suggestion != null),
            map(suggestion => suggestion as IBlogEntry)
        );
    }

    deleteSuggestion(suggestion: IBlogEntry) {
        return this.service.deleteSuggestion(suggestion._id ?? '')
        .then(() => {
            this._notificationService.success('suggestions.deleted');
            this.service.selectSuggestion(null);
        }).catch(e => this._notificationService.error(e));
    }
}