import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppCardsPresentationComponent } from './app-cards-presentation.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';
import { AppBlogRoutingModule } from 'src/app/app-user/app-blog/app-blog-routing.module';
import { streamToBeListed$ as cardsToShow$, TestLanguagePipe } from 'src/test/fake-service-providers';
import { By } from '@angular/platform-browser';

describe('AppCardsPresentationComponent: ', () => {
    let component: AppCardsPresentationComponent;
    let fixture: ComponentFixture<AppCardsPresentationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                AppBlogRoutingModule,
                MarkdownModule.forChild(),
                MatCardModule,
                FlexLayoutModule,
            ],
            declarations: [AppCardsPresentationComponent, TestLanguagePipe],
            providers: [],
             schemas: [NO_ERRORS_SCHEMA]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppCardsPresentationComponent);
        component = fixture.componentInstance;
        component.cardsToShow$ = cardsToShow$;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('Should show title', ()=>{
        fixture.whenStable().then(()=> {
            const title = fixture.debugElement.query(By.css('h5'));
            expect(title).toBeTruthy();
        });
    });

    it('should show content', () => {
        fixture.whenStable().then(()=> {
            const content = fixture.debugElement.query(By.css('.mat-card-content'));
            expect(content).toBeTruthy();
        });
    });
    

});