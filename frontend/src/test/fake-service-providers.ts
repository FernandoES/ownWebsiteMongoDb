import { Component, Pipe, PipeTransform } from "@angular/core";
import { Routes } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { IBlogEntry } from "src/app/app-user/app-user.service";

export class TestAppAccountService {
    logged = false;
    loggedIn$ = new Subject<boolean>();
    sendLogin(mail: string, password: string) {
        this.logged = true;
        this.loggedIn$.next(true);
        return of(`${mail}${password}`);
    }
}

export class TestNotificationService {
    success() {}
}

export class TestAppArticleService {
    
    fetchSigleArticle(id: string) {
        return of({});
    }

    fetchImage(imageName: string) {
        return of({});
    }

    deleteArticle(articleId: string) {
        return of({});
    }
}

export class FakeRoute {
    navigateByUrl(...args: any[]) {
        return new Promise(() => {});
    }
}

@Pipe({ name: 'ownLanguage' })
export class TestLanguagePipe implements PipeTransform {
    transform(value: any, options?: any) {
        return value;
    }
}

@Component({
    template: ''
})
export class DummyComponent {}

export const routes: Routes = [
    {path: 'test', component: DummyComponent}
];

export const fakeBlogEntry: IBlogEntry = {
    title: "titleTest",
    body: "bodyTest",
    _id: "_idTest",
    authorName: "authorNameTest",
    authorMail: "authorMailTest"
}

export const streamToBeListed$: Observable<any> = of( [{
    title: "firstTestTitle",
},
{
    title: "secondTestTitle"
}]);

export class FakeUserService {
    fetchArticlesList() {
        return new Promise(resolve => resolve([fakeBlogEntry]));
    }
}

export class FakeSuggestionsService {
    
}