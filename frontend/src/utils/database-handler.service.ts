import { Injectable } from '@angular/core';
import * as Realm from "realm-web";
import { appId } from './constants';

@Injectable({providedIn: 'root'})
export class DatabaseHandlerService {
    get functions() {
        return this.user?.functions;
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
    app: Realm.App;
    user: Realm.User | any;
    constructor() {}

    initDatabaseApp() {
        this.app = new Realm.App({id: appId});
    }

    logIn(mail?: string, password?: string): Promise<Realm.User> {
        let credentials;
        if(mail && password ) {
            credentials = Realm.Credentials.emailPassword(mail,password);
        }else {
            credentials = Realm.Credentials.anonymous();
        }
        return this.app.logIn(credentials)
        .then(user => this.user = user);
    }
}