import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
        return !!this.userName.length;
    }
    get loggedWithoutName() {
        return this.user?.providerType === "local-userpass" && this.userName === "";
    }
    get userName() {
        return this.user?.customData.userName ?? "";
    }
    get userMail() {
        return this.app?.currentUser?.profile.email ?? "";
    }
    get accessToken() {
        return this.user?.accessToken ?? '';
    }
    get refreshToken() {
        return this.user?.refreshToken ?? '';
    }
    get id() {
        return this.user?.id ?? '';
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
            return credentialsResponse;
        });
    }
    
   loginAnonymously() {
    const anonimousCredentials = Realm.Credentials.anonymous();
      return this.app.logIn(anonimousCredentials)
      .then(credentialsResponse => this.user = credentialsResponse);
   }

    restorePassword(userMail: string, oldPassword: string, newPassword: string): Promise<void> {
        return this.sendLogin(userMail, oldPassword)
        .then(_ => this.app.emailPasswordAuth.callResetPasswordFunction(userMail, newPassword));
    }
    
    createAccount(userMail: string, userName: string, password: string): Promise<any>{
        return this.app.emailPasswordAuth.registerUser(userMail, password)
        .then(_ => this.sendLogin(userMail, password))
        .then(_ => this.addData(userName));
    }

    addData(userName: string) {
        return this.user.functions.addData(this.id, userName, this.userMail);
    }

    logout(): Promise<void> {
        return this.user.logOut()
        .then(() => this.loginAnonymously())
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