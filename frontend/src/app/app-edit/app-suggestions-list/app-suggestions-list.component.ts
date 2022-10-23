import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AppSuggestionsListService } from './app-suggestions-list.service';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { compareArticlesByDate } from 'src/utils/functions/compareArticlesByDate';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './app-suggestions-list.component.html',
  styleUrls: ['./app-suggestions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-suggestions-list'
  }
})
export class AppSuggestionsListComponent {

  suggestionsList$ = this._service.fetchSuggestionsList()
  .then(suggestions => suggestions.sort(compareArticlesByDate)
      .map(suggestion => ({...suggestion, title: suggestion.authorName, Mail: suggestion.authorMail}) as IBlogEntry));

  constructor(private _service: AppSuggestionsListService) { }

  goToSuggestion(suggestion: IBlogEntry){
    this._service.selectedSuggestion.next(suggestion);
  }
}
