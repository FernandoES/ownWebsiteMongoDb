import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LanguageModule } from 'src/language/language.module';
import { AppAuthorRoutingModule } from './app-about-routing.module';

import { AppAboutComponent } from './app-about.component';

@NgModule({
    imports: [
        LanguageModule, 
        CommonModule,
        FlexLayoutModule,
        AppAuthorRoutingModule
     ],
    exports: [],
    declarations: [AppAboutComponent],
    providers: [],
})
export class AppAboutModule { }
