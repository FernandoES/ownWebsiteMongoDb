import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { AppBlogRoutingModule } from 'src/app/app-user/app-blog/app-blog-routing.module';
import { LanguageModule } from 'src/language/language.module';
import { AppCardsPresentationComponent } from './app-cards-presentation/app-cards-presentation.component';
import { SingleEntryComponent } from './single-entry/single-entry.component';


@NgModule({
    imports: [
        CommonModule,
        AppBlogRoutingModule,
        MarkdownModule.forChild(),
        MatCardModule,
        FlexLayoutModule,
        LanguageModule,
        MatIconModule,
    ],
    exports: [AppCardsPresentationComponent, SingleEntryComponent],
    declarations: [AppCardsPresentationComponent, SingleEntryComponent],
    providers: [],
})
export class OwnUtilsModule { }
