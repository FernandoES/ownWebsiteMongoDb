import { Injectable } from '@angular/core';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';

export interface ISuggestion {
    authorName: string,
    authorMail: string,
    body: string,
    _id?: string;
    date?: string;
}

@Injectable()
export class AppSuggestionsService {
    constructor(private _databaseHandlerService: DatabaseHandlerService) { }

    sendSuggestions(suggestion: ISuggestion): Promise<any> {
        return this._databaseHandlerService.functions.postSuggestion(suggestion);
    }
    
}