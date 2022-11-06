import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppLogoutComponent } from './app-logout.component';
import { TestAppAccountService, TestLanguagePipe, TestNotificationService } from 'src/test/fake-service-providers';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account.service';
import { By } from '@angular/platform-browser';

describe('AppLogoutComponent ', () => {
    let component: AppLogoutComponent;
    let fixture: ComponentFixture<AppLogoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppLogoutComponent,TestLanguagePipe],
            providers: [
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppLogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have button', () => {
        const buttons =  fixture.debugElement.queryAll(By.css('button'));
        expect(buttons.length).toBe(1);
        expect(buttons[0].attributes['id']).toBe('logout');
    });
    
    it('should have image',async () => {
        const images = fixture.debugElement.queryAll(By.css('img'));
        expect(images.length).toBe(1);
    });
    

});