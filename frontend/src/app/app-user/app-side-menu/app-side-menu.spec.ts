import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppSideMenuComponent } from './app-side-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppSideMenuRoutingModule } from './app-side-menu-routing.module';
import { FakeUserService, routes, TestLanguagePipe } from 'src/test/fake-service-providers';
import { UserService } from '../app-user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AppSideMenuComponent: ', () => {
    let component: AppSideMenuComponent;
    let fixture: ComponentFixture<AppSideMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatMenuModule,
                MatAutocompleteModule,
                MatIconModule,
                AppSideMenuRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes),
                NoopAnimationsModule ],
            declarations: [AppSideMenuComponent, TestLanguagePipe],
            providers: [
                {provide: UserService, useClass: FakeUserService},
            ]
        });
    }));

    beforeEach(async() => {
        fixture = TestBed.createComponent(AppSideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').click();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should contain icon', ()=>  {
        const icon = fixture.debugElement.query(By.css("mat-icon"));
        expect(icon).toBeTruthy();
    });
});