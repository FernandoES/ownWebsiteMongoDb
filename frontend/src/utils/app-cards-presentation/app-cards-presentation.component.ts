import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation,  } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cards-presentation',
    templateUrl: 'app-cards-presentation.component.html',
    styleUrls: ['app-cards-presentation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-cards-presentation'
    }
})

export class AppCardsPresentationComponent {
    @ContentChild('middleCard') middleCard: TemplateRef<any>;
    @ContentChild('cardContent') cardContent: TemplateRef<any>;
    @Output() buttonClick = new EventEmitter<any>();
    @Input() streamToBeListed$: Observable<any>;
    @Input() header = "";
    constructor() {}
}