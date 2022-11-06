import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppAddNameComponent } from './app-add-name.component';
import { TestAppAccountService, TestLanguagePipe, TestNotificationService } from 'src/test/fake-service-providers';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';


describe('AppAddNameComponent: ', () => {
    let component: AppAddNameComponent;
    let fixture: ComponentFixture<AppAddNameComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                MatInputModule,
                FlexLayoutModule,
                MatCardModule,
                MatFormFieldModule,
            ],
            declarations: [AppAddNameComponent, TestLanguagePipe],
            providers: [
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService},]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppAddNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have two buttons', () => {
        const buttons =  fixture.debugElement.queryAll(By.css('button'));
        expect(buttons.length).toBe(2);
    });
    

});
