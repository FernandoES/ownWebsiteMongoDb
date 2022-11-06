import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppBlogComponent } from './app-blog.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { OwnUtilsModule } from 'src/utils/own-utils.module';
import { AppBlogRoutingModule } from './app-blog-routing.module';
import { ActivatedRoute } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import { of } from 'rxjs';
import { TestNotificationService, TestLanguagePipe, FakeUserService, routes } from 'src/test/fake-service-providers';
import { NotificationService } from 'src/utils/notification.service';
import { UserService } from '../app-user.service';
import { By } from '@angular/platform-browser';

describe('AppBlogComponent: ', () => {
    let component: AppBlogComponent;
    let fixture: ComponentFixture<AppBlogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                AppBlogRoutingModule,
                MarkdownModule.forRoot(),
                MatCardModule,
                FlexLayoutModule,
                OwnUtilsModule,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [AppBlogComponent, TestLanguagePipe],
            providers: [
                {provide: UserService, useClass: FakeUserService},
                {provide: ActivatedRoute, useValue: {params: of({id: 0})}},
                {provide: NotificationService, useClass: TestNotificationService},]
        }).compileComponents();
    }));

    describe('Given single value', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(AppBlogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        
        it('should be created', () => {
            expect(component).toBeTruthy();
        });
        
        it('should show image with proper image',() => {
            fixture.whenStable().then(() => {
                const images = fixture.debugElement.queryAll(By.css("img"));
                expect(images.length).toBe(1);
            });
        });
        
        it('should show markdown', () => {
            fixture.whenStable().then(() => {

                const markdown = fixture.debugElement.queryAll(By.directive(MarkdownComponent));
                expect(markdown.length).toBe(1);
            });
        });
    });  
});