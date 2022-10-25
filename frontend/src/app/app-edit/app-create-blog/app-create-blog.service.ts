import { Injectable } from '@angular/core';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';

@Injectable()
export class AppCreateBlogService {
    constructor(private _databaseHandlerService: DatabaseHandlerService) { }
    
    saveBlog(blog: IBlogEntry): Promise<any> {
        return this._databaseHandlerService.functions.saveArticle(
            {...blog, authorName: this._databaseHandlerService.userName, authorMail: this._databaseHandlerService.userMail}
        );
    }
    
    editBlog(blog: IBlogEntry, entryId: string): Promise<any>  {
        return this._databaseHandlerService.functions.editArticle(blog, entryId);
    }
        
    fetchSigleArticle(id: string): Promise<IBlogEntry> {
        return this._databaseHandlerService.functions.fetchSigleArticle(id);
    }
    
}