import { Injectable } from '@angular/core';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';

export interface IBlogEntry {
    title: string;
    body: string;
    _id?: string;
    date?: string;
    authorName: string;
    authorMail: string;
    image?: string;
    smallImage?: string;
}

@Injectable()
export class UserService {
    constructor(private _databaseHandlerService: DatabaseHandlerService) { }
    fetchArticlesList(): Promise<IBlogEntry[]> {
       return this._databaseHandlerService.functions.fetchArticles();
    }
}