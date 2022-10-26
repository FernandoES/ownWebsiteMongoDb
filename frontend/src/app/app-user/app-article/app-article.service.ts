import { Injectable } from '@angular/core';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';
import { IBlogEntry } from '../app-user.service';


@Injectable()
export class AppArticleService {
    constructor(private _databaseHandlerService: DatabaseHandlerService) { }

    fetchSingleArticle(id: string): Promise<IBlogEntry> {
        return this._databaseHandlerService.functions.fetchArticle(id);
    }

    deleteArticle(id: string): Promise<any> {
        return this._databaseHandlerService.functions.deleteArticle(id.toString());
    }
    
}