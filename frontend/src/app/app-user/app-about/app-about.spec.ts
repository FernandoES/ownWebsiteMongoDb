import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppAboutComponent } from './app-about.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { AppAuthorRoutingModule } from './app-about-routing.module';
import { By } from '@angular/platform-browser';
import { TestLanguagePipe } from 'src/test/fake-service-providers';

describe('AppAboutComponent: ', () => {
    let component: AppAboutComponent;
    let fixture: ComponentFixture<AppAboutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FlexLayoutModule,
                AppAuthorRoutingModule,
                MarkdownModule.forRoot()],
            declarations: [AppAboutComponent, TestLanguagePipe],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppAboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should contain image', () => {
        const images = fixture.debugElement.queryAll(By.css('img'));
        expect(images.length).toBe(1);
        expect(images[0].attributes['src']).toBe("assets/author.jpg");
    });

    it('should contain text', () => {
        const text = fixture.debugElement.queryAll(By.css('span'));
        expect(text.length).toBeGreaterThanOrEqual(1);
    });
});