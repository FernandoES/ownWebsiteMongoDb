import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { apiPathStart } from 'src/utils/constants';

export interface IBlogEntry {
    title: string;
    body: string;
    _id?: string;
    date?: string;
    authorName: string;
    authorMail: string;
    imageName?: string;
    imagePath?: SafeResourceUrl;
}

@Injectable()
export class UserService {
    constructor(private _http : HttpClient, private sanitizer: DomSanitizer) { }
    apiBaseUrl = `/${apiPathStart}/articles`;
    fetchArticlesList(): Observable<IBlogEntry[]> {
        return this._http.get<IBlogEntry[]>(`${this.apiBaseUrl}/articlesList`);
    }
    
    fetchImage(imageName: string) {
        return this._http.get(`${this.apiBaseUrl}/image/${imageName}`, { responseType: 'blob' }).pipe(
            map(x => {
              const urlToBlob = window.URL.createObjectURL(x)
              return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); 
            }))
    }
}