import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './app-user/app-header/app-header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from 'src/utils/notification.service';
import { I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { LanguageModule } from 'src/language/language.module';
import { AppAccountService } from './app-account/app-account.service';
import { MarkdownModule } from 'ngx-markdown';

export function appInit(i18next: ITranslationService) {
  return () => i18next.init({
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      ns: [
        'translation',
        'validation',
        'error'          
      ],
    });
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppHeaderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    I18NextModule.forRoot(),
    MarkdownModule.forRoot(),
    HttpClientModule,
    LanguageModule
  ],
  providers: [
    NotificationService,
    AppAccountService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
