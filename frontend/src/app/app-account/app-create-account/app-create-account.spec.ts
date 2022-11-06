import { CommonModule } from "@angular/common";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TestLanguagePipe, TestAppAccountService, TestNotificationService } from "src/test/fake-service-providers";
import { NotificationService } from "src/utils/notification.service";
import { AppAccountRoutingModule } from "../app-account-routing.module";
import { AppAccountComponent } from "../app-account.component";
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppAccountService } from "../app-account.service";
import { AppLoginComponent } from "../app-login/app-login.component";
import { AppLogoutComponent } from "../app-logout/app-logout.component";
import { AppRestorePasswordComponent } from "../app-restore-password/app-restore-password.component";
import { AppCreateAccountComponent } from "./app-create-account.component";
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppCreateAccountHarness } from "./app-create-account.harness";

describe('GIVEN app-create-account', () => {
    let password = 'fakePassword';
    let email = 'fake@email';
    let name = 'fakeName';

    let fixture: ComponentFixture<AppCreateAccountComponent>;
    let component: AppCreateAccountComponent;
    let harness: AppCreateAccountHarness;

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
                {provide: NotificationService, useClass: TestNotificationService}
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppCreateAccountComponent);
        component = fixture.debugElement.componentInstance;
        harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, AppCreateAccountHarness);
    }));

    it('SHOULD create', ()=> {
        expect(component).toBeTruthy();
        expect(fixture).toBeTruthy();
        expect(harness).toBeTruthy();
    });
    
    it('SHOULD still be invalid', () => {
        expect(component.createForm.invalid).toBeTrue();
    });

    describe('GIVEN email and password', () => {
        beforeEach(()=> {
            const emailControl = component.createForm.form.controls['email'];
            const passwordControl = component.createForm.controls['password'];
            const nameControl = component.createForm.controls['name'];
            emailControl.setValue(email);
            passwordControl.setValue(password);
            nameControl.setValue(name);
            fixture.detectChanges();
        });

        it('SHOULD be valid',async () => {
            expect(component.createForm.invalid).toBeFalse();
        });
        
        it('SHOULD not complain', () => {
            const error = component.createForm.controls['email'].errors;
            expect(error).toBeFalsy();
        });
    });

    describe('GIVEN wrong Email', () => {
        beforeEach(()=> {
            const emailControl = component.createForm.controls['email'];
            emailControl.setValue('email');
            fixture.detectChanges();
        });

        it('SHOULD complain', () => {
            const error = component.createForm.controls['email'].errors;
            expect(error).toBeTruthy();
        });
    });
});
