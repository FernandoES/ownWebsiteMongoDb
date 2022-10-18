import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppArticleRoutingModule } from './app-article-routing.module';
import { AppArticleComponent } from './app-article.component';
import { AppArticleService } from './app-article.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LanguageModule } from 'src/language/language.module';
import { OwnUtilsModule } from 'src/utils/own-utils.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    AppArticleComponent
  ],
  imports: [
    CommonModule,
    AppArticleRoutingModule,
    FlexLayoutModule,
    MarkdownModule.forChild(),
    LanguageModule,
    OwnUtilsModule
  ],
  providers: [
    AppArticleService
  ]
})
export class AppArticleModule { }
