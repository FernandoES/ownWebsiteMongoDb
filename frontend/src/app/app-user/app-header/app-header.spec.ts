import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAccountService } from 'src/app/app-account/app-account.service';
import { TestAppAccountService, TestLanguagePipe } from 'src/test/fake-service-providers';
import { routes } from '../app-about/app-about-routing.module';
import { AppHeaderComponent } from './app-header.component';


describe('AppHeaderComponent: ', () => {
    let component: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                CommonModule,
                RouterTestingModule.withRoutes(routes)
            ],
            declarations: [AppHeaderComponent, TestLanguagePipe],
            providers: [
                {provide: AppAccountService, useClass: TestAppAccountService},
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should have four options available', () => {
        expect(component.options.length).toBe(4);
    });

    it('should show the three options for not logged', () => {
        const listEntries = fixture.debugElement.queryAll(By.css('li a'));
        expect(listEntries.length).toBe(3);
    });

    describe('Given logged in', () => {
        beforeEach(async () => {
            await component.accountService.sendLogin("", "");
            fixture.detectChanges();
        });
        
    
        it('should show four options', () => {
            fixture.whenStable().then(() => {
                const listEntriesLoggedIn = fixture.debugElement.queryAll(By.css('li a'));
                expect(listEntriesLoggedIn.length).toBe(4);
            });
        });
    });
});