import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppAccountService } from "src/app/app-account/app-account.service";
import { DatabaseHandlerService } from "../database-handler.service";

@Injectable()
export class HttpOwnInterceptor implements HttpInterceptor {
    constructor(
       private _appAccountService: AppAccountService,
       private _databaseHandlerService: DatabaseHandlerService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ( this._appAccountService.password ) {
            req = req.clone({
                setHeaders: {
                    'email': this._databaseHandlerService.userMail,
                    'password': this._appAccountService.password
                }
            });
        } else if ( this._appAccountService.accessToken.length) {
            req = req.clone({
                setHeaders: {
                    'accessToken': this._appAccountService.accessToken,
                    'refreshToken': this._appAccountService.refreshToken
                }
            });
        }
        return next.handle(req);
    }
}