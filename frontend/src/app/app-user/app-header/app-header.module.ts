import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LanguageModule } from 'src/language/language.module';
import { AppHeaderComponent } from './app-header.component';

@NgModule({
    imports: [FlexLayoutModule,CommonModule,RouterModule, LanguageModule  ],
    exports: [AppHeaderComponent],
    declarations: [AppHeaderComponent],
    providers: [],
})
export class AppHeaderModule { }
