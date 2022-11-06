import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SingleEntryComponent } from './single-entry.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { AppBlogRoutingModule } from 'src/app/app-user/app-blog/app-blog-routing.module';
import { fakeBlogEntry, TestAppArticleService, TestLanguagePipe, TestNotificationService } from 'src/test/fake-service-providers';
import { AppArticleService } from 'src/app/app-user/app-article/app-article.service';
import { NotificationService } from '../notification.service';
import { of, Subject } from 'rxjs';
import {MatIconHarness} from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';


describe('SingleEntryComponent: ', () => {
    let component: SingleEntryComponent;
    let fixture: ComponentFixture<SingleEntryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                AppBlogRoutingModule,
                MarkdownModule.forRoot(),
                MatCardModule,
                FlexLayoutModule,
                MatIconModule,
            ],
            declarations: [SingleEntryComponent, TestLanguagePipe],
            providers: [
                {provide: AppArticleService, useClass: TestAppArticleService},
                {provide: NotificationService, useClass: TestNotificationService},
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleEntryComponent);
        component = fixture.componentInstance;
        component.entry$ = of(fakeBlogEntry);
        component.error$ = new Subject<string>();
        fixture.detectChanges();
    });
    
    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should show no icon yet', () => {
        const icons = fixture.debugElement.queryAll(By.directive(MatIconHarness));
        expect(icons.length).toBe(0);
    });

    it('should show markdown', () => {
        const markdown = fixture.debugElement.queryAll(By.directive(MarkdownComponent));
        expect(markdown.length).toBe(1);
    }); 
});