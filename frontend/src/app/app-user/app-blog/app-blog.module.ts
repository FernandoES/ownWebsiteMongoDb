import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBlogRoutingModule } from './app-blog-routing.module';
import { AppBlogComponent } from './app-blog.component';
import { LanguageModule } from 'src/language/language.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwnUtilsModule } from 'src/utils/own-utils.module';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    AppBlogComponent
  ],
  exports: [AppBlogComponent],
  imports: [
    CommonModule,
    AppBlogRoutingModule,
    MarkdownModule.forChild(),
    MatCardModule,
    FlexLayoutModule,
    LanguageModule,
    OwnUtilsModule,
    MatIconModule
  ],
  providers: [ ]
})
export class AppBlogModule { }
