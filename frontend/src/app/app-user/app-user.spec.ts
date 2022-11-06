import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestLanguagePipe, FakeUserService, TestAppAccountService, TestNotificationService } from 'src/test/fake-service-providers';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account/app-account.service';
import { routes } from './app-about/app-about-routing.module';
import { AppHeaderModule } from './app-header/app-header.module';
import { AppSideMenuModule } from './app-side-menu/app-side-menu.module';
import { AppUserRoutingModule } from './app-user-routing.module';
import { AppUserComponent } from './app-user.component';
import { UserService } from './app-user.service';

describe('AppUserComponent: ', () => {
    let component: AppUserComponent;
    let fixture: ComponentFixture<AppUserComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                AppHeaderModule,
                AppUserRoutingModule,
                AppSideMenuModule,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [AppUserComponent, TestLanguagePipe],
            providers: [
                {provide: UserService, useClass: FakeUserService},
                {provide: AppAccountService, useClass: TestAppAccountService},
                {provide: NotificationService, useClass: TestNotificationService}
            ],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});