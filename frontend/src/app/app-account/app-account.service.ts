import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
import { apiPathStart, appId } from 'src/utils/constants';
import * as Realm from "realm-web";

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
        return !!this.user?.customData.length;
    }
    get userName() {
        return this.user?.customData.userName ?? "";
    }
    get userMail() {
        return this.user?.customData?.userMail ?? "";
    }
    get accessToken() {
        return this.user?.accessToken ?? '';
    }
    get refreshToken() {
        return this.user?.refreshToken ?? '';
    }
    loggedIn$ = new Subject<boolean>();
    password: string;
    apiBaseUrl = `/${apiPathStart}/login`;
    app: Realm.App;
    user: Realm.User | any;
    constructor(
        private _http : HttpClient
        ) {
        this.app = new Realm.App({id: appId});
        

    }
    sendLogin(userMail: string, password: string){
        const credentials = Realm.Credentials.emailPassword(userMail, password);
        return this.app.logIn(credentials)
        .then(credentialsResponse => {
            this.password = password;
            this.user = new Realm.User(credentialsResponse);
            this.loggedIn$.next(true);
            return this.user.functions.isLogged();
        });
    }
    

   loginAnonymously() {
    const anonimousCredentials = Realm.Credentials.anonymous();
      return this.app.logIn(anonimousCredentials)
      .then(credentialsResponse => this.user = credentialsResponse);
   }

    restorePassword(userMail: string, oldPassword: string, newPassword: string) {
        return this._http.post(`${this.apiBaseUrl}/restorePassword`,
        {userMail: userMail, oldPassword: oldPassword, newPassword: newPassword});
    }
    
    createAccount(userMail: string, userName: string, password: string): Observable<string>{
        return from(this.app.emailPasswordAuth.registerUser(userMail, password)
        .then(_ => {
            const credentials = Realm.Credentials.emailPassword(userMail, password);
            return this.app.logIn(credentials);
        }
        ))
        .pipe(switchMap(userData => {
            return this._http.post<any>(`${this.apiBaseUrl}/addData`, {id: (userData.id ), userName, userMail });
    }
        ));
    }

    checkIfLogged() {
        return this._http.get<any>(`${this.apiBaseUrl}/isLogged`).pipe(tap(response => {
            if (!!response.data.length) {
                this.loggedIn$.next(true);
            }
        }));
    }

    logout() {
        return this._http.delete<{status: string}>(`${this.apiBaseUrl}/logout`).pipe(tap(() => {
            this.loggedIn$.next(false);
        }));
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