import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IBlogEntry } from 'src/app/app-user/app-user.service';
import { apiPathStart } from 'src/utils/constants';
import { AppAccountService } from '../../app-account/app-account.service';

@Injectable()
export class AppCreateBlogService {
    constructor(private _accountService: AppAccountService, private _http: HttpClient) { }
    apiBaseUrl = `/${apiPathStart}/articles`;

    saveBlog(blog: IBlogEntry, image?: File){
        if (image) {
            return this.uploadImage(image)
            .pipe(switchMap(response => this.saveArticle({...blog, authorName: this._accountService.userName, authorMail: this._accountService.userMail, imageName: response.imageName})));
        }
        return this.saveArticle({...blog, authorName: this._accountService.userName, authorMail: this._accountService.userMail})
    }
    
    editBlog(blog: IBlogEntry, entryId: string, image?: File) {
        if (image && blog.imageName) {
            return this.substituteImage(image, blog.imageName)
            .pipe(switchMap(response => {
                return this.editArticle({...blog, imageName: response.imageName}, entryId);}))
        }
        else if(image) {
            return this.uploadImage(image)
            .pipe(switchMap(response => this.editArticle({...blog, imageName: response.imageName}, entryId)));
        }
        return this.editArticle(blog, entryId);
    }
    
    editArticle(blogValues: Object, entryId: string) {
        return this._http.post(`${this.apiBaseUrl}/editArticle/${entryId}`, blogValues);
    }

    
    saveArticle(blogValues: Object): Observable<Object> {
        return this._http.post(`${this.apiBaseUrl}/saveArticle`, blogValues);
    }

    substituteImage(image: File, oldImageName: string) {
        const formData = new FormData();
        formData.append('file', image);
        return this._http.post<{imageName: string}>(`${this.apiBaseUrl}/substituteImage/${oldImageName}`, formData);
    }

    uploadImage(image: File): Observable<{imageName: string}> {
        const formData = new FormData();
        formData.append('file', image);
        return this._http.post<{imageName: string}>(`${this.apiBaseUrl}/image`, formData);
    }
    
    fetchSigleArticle(id: string): Observable<IBlogEntry> {
        return this._http.get<IBlogEntry>(`${this.apiBaseUrl}/article/${id}`);
    }
    
}