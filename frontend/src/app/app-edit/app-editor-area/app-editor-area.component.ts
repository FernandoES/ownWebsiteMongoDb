import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AppSuggestionsListService } from '../app-suggestions-list/app-suggestions-list.service';

enum EditOption {
    CREATE,
    SUGGESTIONS
}
@Component({
    selector: 'app-editor-area',
    templateUrl: 'app-editor-area.component.html',
    styleUrls: ['./app-editor-area.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
      class: 'app-editor-area'
    }
})

export class AppEditorAreaComponent{
    EditOption = EditOption;
    selectedEditOption = EditOption.CREATE;
    constructor(public suggestionService: AppSuggestionsListService) {}
    
    goToCreateBlog() {
        this.selectedEditOption = EditOption.CREATE;
    }

    goToSuggestions() {
        this.selectedEditOption = EditOption.SUGGESTIONS;
    }
}