import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppSuggestionComponent } from './app-suggestion.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppSuggestionsRoutingModule } from './app-suggestion-routing.module';
import { AppSuggestionsService } from './app-suggestion.service';
import { NotificationService } from 'src/utils/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppSuggestionHarness } from './app-suggestion.harness';
import { FakeSuggestionsService, TestLanguagePipe, TestNotificationService } from 'src/test/fake-service-providers';


describe('AppSuggestionComponent: ', () => {
    let authorName = "testAuthorName";
    let authorMail = "testAuthorMail";
    let body = "testBody";

    let component: AppSuggestionComponent;
    let fixture: ComponentFixture<AppSuggestionComponent>;
    let harness: AppSuggestionHarness;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatMenuModule,
                FormsModule,
                AppSuggestionsRoutingModule,
                MatInputModule,
                FlexLayoutModule,    
                MatButtonModule, 
                NoopAnimationsModule
            ],
            declarations: [AppSuggestionComponent, TestLanguagePipe],
            providers: [{provide: AppSuggestionsService, useClass: FakeSuggestionsService},
                {provide: NotificationService, useClass: TestNotificationService}],
             schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(AppSuggestionComponent);
        component = fixture.debugElement.componentInstance;
        harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppSuggestionHarness);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();
        expect(harness).toBeTruthy();
    });

    it('Should be valid', ()=> {
        expect(component.suggestionForm.invalid).toBeFalse();
    });

    describe('Given all required information but wrong', () => {
        beforeEach(()=> {
            const authorNameControl = component.suggestionForm.form.controls['authorName'];
            const authorMailControl = component.suggestionForm.form.controls['authorMail'];
            const bodyControl = component.suggestionForm.form.controls['body'];
            authorNameControl.setValue(authorName);
            authorMailControl.setValue(authorMail);
            bodyControl.setValue(bodyControl);
            component.suggestion = {authorName, authorMail, body};
            fixture.detectChanges();
        });
    
        it('should show wrong Email', () => {
          fixture.whenStable().then(()=> {
            const error = component.suggestionForm.form.controls['authorMail'].errors;
            expect(error).toBeTruthy();
          });
        });
    });

    describe('Given all required information correctly', () => {
        beforeEach(()=> {
            const authorNameControl = component.suggestionForm.form.controls['authorName'];
            const authorMailControl = component.suggestionForm.form.controls['authorMail'];
            const bodyControl = component.suggestionForm.form.controls['body'];
            authorNameControl.setValue(authorName);
            authorMailControl.setValue(`${authorMail}@${authorMail}`);
            bodyControl.setValue(bodyControl);
            component.suggestion = {authorName, authorMail: `${authorMail}@${authorMail}`, body};
        });

        it('SHOULD be valid',async () => {
            expect(component.suggestionForm.form.invalid).toBeFalse();
        });
    });
});