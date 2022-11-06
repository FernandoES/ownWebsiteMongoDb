import { AppLoginComponent } from "./app-login.component";
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppLoginHarness } from "./app-login.harness";
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppAccountRoutingModule } from "../app-account-routing.module";
import { AppAccountComponent } from "../app-account.component";
import { AppCreateAccountComponent } from "../app-create-account/app-create-account.component";
import { AppLogoutComponent } from "../app-logout/app-logout.component";
import { AppRestorePasswordComponent } from "../app-restore-password/app-restore-password.component";
import { FormsModule } from '@angular/forms';
import { TestAppAccountService, TestLanguagePipe, TestNotificationService } from "src/test/fake-service-providers";
import { AppAccountService } from "../app-account.service";
import { NotificationService } from "src/utils/notification.service";


describe('GIVEN app-login', () => {
    let password = 'fakePassword';
    let email = 'fake@email';

    let fixture: ComponentFixture<AppLoginComponent>;
    let component: AppLoginComponent;
    let harness: AppLoginHarness;

    beforeEach(waitForAsync(async() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                MatInputModule,
                FlexLayoutModule,
                MatCardModule,
                MatFormFieldModule,
                AppAccountRoutingModule],
            declarations: [AppLoginComponent, 
                AppRestorePasswordComponent,
                AppCreateAccountComponent,
                AppAccountComponent,
                AppLogoutComponent,
                TestLanguagePipe],
            providers: [
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService},
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppLoginComponent);
        component = fixture.debugElement.componentInstance;
        harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppLoginHarness);
        
    }));

    it('SHOULD create',async ()=> {
        expect(component).toBeTruthy();
        expect(fixture).toBeTruthy();
        expect(harness).toBeTruthy();
    });
    
    it('SHOULD still be invalid', () => {
        expect(component.loginForm.invalid).toBeTrue();
    });
    
    describe('GIVEN email and password', () => {
        beforeEach(async()=> {
            const emailControl = component.loginForm.controls['email'];
            const passwordControl = component.loginForm.controls['password'];
            emailControl.setValue(email);
            passwordControl.setValue(password);
            fixture.detectChanges();
        });
        
        it('SHOULD be valid',async () => {
            expect(component.loginForm.invalid).toBeFalse();
        });
        
        it('SHOULD not complain', () => {
            const error = component.loginForm.controls['email'].errors;
            expect(error).toBeFalsy();
        });
    });

    describe('GIVEN wrong Email', () => {
        beforeEach(()=> {
            const emailControl = component.loginForm.controls['email'];
            emailControl.setValue('email');
            fixture.detectChanges();
        });

        it('SHOULD complain', () => {
            const error = component.loginForm.controls['email'].errors;
            expect(error).toBeTruthy();
        });
    });
});