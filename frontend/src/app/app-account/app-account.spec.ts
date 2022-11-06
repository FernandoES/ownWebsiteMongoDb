import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { TestLanguagePipe, TestAppAccountService, TestNotificationService } from 'src/test/fake-service-providers';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountComponent, LoginOption } from './app-account.component';
import { AppAccountService } from './app-account.service';
import { AppCreateAccountComponent } from './app-create-account/app-create-account.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppLogoutComponent } from './app-logout/app-logout.component';
import { AppRestorePasswordComponent } from './app-restore-password/app-restore-password.component';

describe('AppAccountComponent: ', () => {
    let component: AppAccountComponent;
    let fixture: ComponentFixture<AppAccountComponent>;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule,
                FormsModule,
                MatInputModule,
                FlexLayoutModule,
                MatCardModule,
                MatFormFieldModule,],
            declarations: [AppLoginComponent, 
                AppRestorePasswordComponent,
                AppCreateAccountComponent,
                AppAccountComponent,
                AppLogoutComponent,
                TestLanguagePipe],
            providers: [
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService},
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppAccountComponent);
        component = fixture.componentInstance;
        component.selectedLoginOption = LoginOption.LOGIN;
        fixture.detectChanges();
    });
    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('Per default', () => {
    
        it('should have login per default', () => {
            const login = fixture.debugElement.query(By.directive(AppLoginComponent));
            expect(login).toBeTruthy();
        });
        
        it('should not show any other element', () => {
            const restore = fixture.debugElement.query(By.directive(AppRestorePasswordComponent));
            const createAccount = fixture.debugElement.query(By.directive(AppCreateAccountComponent));
            const logout = fixture.debugElement.query(By.directive(AppLogoutComponent));
            
            expect(restore).toBeFalsy();
            expect(logout).toBeFalsy();
            expect(createAccount).toBeFalsy();
        });
        
    });

    describe('selected create', () => {

        beforeEach(() => {
        component.selectedLoginOption = LoginOption.CREATE;
        fixture.detectChanges();
        });
        
    
        it('should show create', () => {
            fixture.whenStable().then(() => {
                const create = fixture.debugElement.query(By.directive(AppCreateAccountComponent));
                expect(create).toBeTruthy();
            });
        });

        it('should not show any other component', () => {
            fixture.whenStable().then(() => {
                const restore = fixture.debugElement.query(By.directive(AppRestorePasswordComponent));
                const login = fixture.debugElement.query(By.directive(AppLoginComponent));
                const logout = fixture.debugElement.query(By.directive(AppLogoutComponent));
                
                expect(restore).toBeFalsy();
                expect(logout).toBeFalsy();
                expect(login).toBeFalsy();
            });
        });
        
    
    });
    describe('selected restore', () => {

        beforeEach(() => {
        component.selectedLoginOption = LoginOption.RESTORE;
        fixture.detectChanges();
        });
        
    
        it('should show create', () => {
            fixture.whenStable().then(() => {
                const restore = fixture.debugElement.query(By.directive(AppRestorePasswordComponent));
                expect(restore).toBeTruthy();
            });
        });

        it('should not show any other component', () => {
            fixture.whenStable().then(() => {
                const create = fixture.debugElement.query(By.directive(AppCreateAccountComponent));
                const login = fixture.debugElement.query(By.directive(AppLoginComponent));
                const logout = fixture.debugElement.query(By.directive(AppLogoutComponent));
                
                expect(create).toBeFalsy();
                expect(logout).toBeFalsy();
                expect(login).toBeFalsy();
            });
        });
    });
});