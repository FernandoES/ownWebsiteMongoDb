import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppArticleComponent } from './app-article.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { routes, TestAppAccountService, TestAppArticleService, TestLanguagePipe, TestNotificationService } from 'src/test/fake-service-providers';
import { OwnUtilsModule } from 'src/utils/own-utils.module';
import { AppArticleRoutingModule } from './app-article-routing.module';
import { By } from '@angular/platform-browser';
import { SingleEntryComponent } from 'src/utils/single-entry/single-entry.component';
import { AppArticleService } from './app-article.service';
import {RouterTestingModule} from "@angular/router/testing";
import { ActivatedRoute } from '@angular/router';
import { AppAccountService } from 'src/app/app-account/app-account.service';
import { NotificationService } from 'src/utils/notification.service';
import { of } from 'rxjs';

describe('AppArticleComponent: ', () => {
    let component: AppArticleComponent;
    let fixture: ComponentFixture<AppArticleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                CommonModule,
                AppArticleRoutingModule,
                FlexLayoutModule,
                MarkdownModule.forRoot(),
                OwnUtilsModule],
            declarations: [AppArticleComponent, TestLanguagePipe],
            providers: [
                {provide: AppArticleService, useClass: TestAppArticleService},
                {provide: ActivatedRoute, useValue: {params: of({id: 0})}},
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService},
        ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a single entry', () => {
        const entry = fixture.debugElement.query(By.directive(SingleEntryComponent));
        expect(entry).toBeTruthy();
    });
    
});