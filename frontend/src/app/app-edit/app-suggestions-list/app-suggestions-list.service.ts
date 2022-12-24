import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { ISuggestion } from 'src/app/app-user/app-suggestion/app-suggestion.service';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';


@Injectable()
export class AppSuggestionsListService {
    public selectedSuggestion = new Subject<IBlogEntry | null>();
    constructor(private _databaseHandlerService: DatabaseHandlerService) { }
    fetchSuggestionsList(): Promise<ISuggestion[]> {
      return this._databaseHandlerService.functions.fetchSuggestions().then((response: {suggestions: ISuggestion[]}) => response.suggestions);
    }

    selectSuggestion(suggestion: IBlogEntry | null){
      this.selectedSuggestion.next(suggestion);
    }

    deleteSuggestion(suggestionId: string): Promise<any> {
      return this._databaseHandlerService.functions.deleteSuggestion(suggestionId);
    }
}