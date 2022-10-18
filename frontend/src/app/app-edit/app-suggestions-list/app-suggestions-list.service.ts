import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISuggestion } from 'src/app/app-user/app-suggestion/app-suggestion.service';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { apiPathStart } from 'src/utils/constants';


@Injectable()
export class AppSuggestionsListService {
    apiBaseUrl = `/${apiPathStart}/suggestions`;
    public selectedSuggestion = new Subject<IBlogEntry | null>();
    constructor(private _http: HttpClient) { }
    fetchSuggestionsList(): Observable<ISuggestion[]> {
      return this._http.get<ISuggestion[]>(`${this.apiBaseUrl}/suggestionsList`);
    }

    selectSuggestion(suggestion: IBlogEntry | null){
      this.selectedSuggestion.next(suggestion);
    }

    deleteSuggestion(suggestionId: string) {
      return this._http.delete(`${this.apiBaseUrl}/suggestion/${suggestionId}`);
    }
}