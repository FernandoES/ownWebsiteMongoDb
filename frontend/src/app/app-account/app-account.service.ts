import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiPathStart } from 'src/utils/constants';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';

export interface Logged {
    logged: true;
    userMail?: string;
    userName?: string;
}

export interface Petition {
    userName: string;
    userMail: string;
    _id: number;
}
@Injectable()
export class AppAccountService {
    get logged() {
        return !!this._databaseHandlerService.userName.length;
    }
    get loggedWithoutName() {
        return this._databaseHandlerService.user?.providerType === "local-userpass" && this._databaseHandlerService.userName === "";
    }
    get accessToken() {
        return this._databaseHandlerService.user?.accessToken ?? '';
    }
    get refreshToken() {
        return this._databaseHandlerService.user?.refreshToken ?? '';
    }
    get id() {
        return this._databaseHandlerService.user?.id ?? '';
    }
    loggedIn$ = new Subject<boolean>();
    password: string;
    apiBaseUrl = `/${apiPathStart}/login`;
    constructor(
        private _http : HttpClient,
        private _databaseHandlerService: DatabaseHandlerService
    ) { }

    sendLogin(userMail: string, password: string){
        return this._databaseHandlerService.logIn(userMail, password)
        .then(credentialsResponse => {
            this.password = password;
            this.loggedIn$.next(true);
            return credentialsResponse;
        });
    }

    restorePassword(userMail: string, oldPassword: string, newPassword: string): Promise<void> {
        return this.sendLogin(userMail, oldPassword)
        .then(_ => this._databaseHandlerService.app.emailPasswordAuth.callResetPasswordFunction(userMail, newPassword));
    }
    
    createAccount(userMail: string, userName: string, password: string): Promise<any>{
        return this._databaseHandlerService.app.emailPasswordAuth.registerUser(userMail, password)
        .then(_ => this.sendLogin(userMail, password))
        .then(_ => this.addData(userName));
    }

    addData(userName: string) {
        return this._databaseHandlerService.functions.addData(this.id, userName, this._databaseHandlerService.userMail);
    }

    logout(): Promise<void> {
        return this._databaseHandlerService.user.logOut()
        .then(() => this._databaseHandlerService.logIn())
        .then(() => {
            this.password = "";
            this.loggedIn$.next(false);
        });
    }

    fetchAccountPetitions() {
        return this._http.get<{accountPetitions: Petition[]}>(`${this.apiBaseUrl}/accountPetitions`);
    }

    acceptPetition(petitionId: number) {
        return this._http.post<{status: string}>(`${this.apiBaseUrl}/accountPetitions/accept`, {petitionId});
    }

    rejectPetition(petitionId: number) {
        return this._http.post<{status: string}>(`${this.apiBaseUrl}/accountPetitions/reject`,  {petitionId});
    }
}