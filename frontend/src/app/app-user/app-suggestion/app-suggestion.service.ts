import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPathStart } from 'src/utils/constants';

export interface ISuggestion {
    authorName: string,
    authorMail: string,
    body: string,
    _id?: string;
    date?: string;
}

@Injectable()
export class AppSuggestionsService {
    apiBaseroute = `/${apiPathStart}/suggestions`;
    constructor(private _http : HttpClient) { }

    sendSuggestions(suggestion: ISuggestion) {
        return this._http.post(`${this.apiBaseroute}/suggestion`, suggestion);
    }
    
}