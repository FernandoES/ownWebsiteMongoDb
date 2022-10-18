import { ChangeDetectionStrategy, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IBlogEntry } from 'src/app/app-user/app-user.service';

@Component({
    selector: 'single-entry',
    templateUrl: 'single-entry.component.html',
    styleUrls: ['single-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: "single-entry"
    }
})
export class SingleEntryComponent {
    @Input() entry$: Observable<IBlogEntry>;
    @Input() error$: Subject<string>;
    @Input() showDeleteButton = false;
    @Output() deleteClick = new Subject<IBlogEntry>();
    @Input() showEditButton = false;
    @Output() editClick = new Subject<IBlogEntry>();
    constructor() {}
}