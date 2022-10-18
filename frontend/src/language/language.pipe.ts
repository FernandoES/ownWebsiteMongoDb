import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TOptions } from 'i18next';
import { Subscription } from 'rxjs';
import { LanguageService } from './language.service';

@Pipe({
    name: 'ownLanguage',
    pure: false
})

export class LanguagePipe implements PipeTransform {
    translationOptions: TOptions;
    languageEventSubscription: Subscription;
    translatedText: string;
    constructor(private _languageService: LanguageService, private _ref: ChangeDetectorRef) {}
    transform(value: any, options?: TOptions): string {
        this._unsubscribe();
        this.languageEventSubscription = this._languageService.languageEvents.subscribe(() => {
            this.translatedText = this._languageService.translate(value);
            this._ref.markForCheck();
        });
        return this.translatedText;
    }

    private _unsubscribe(){
        if (this.languageEventSubscription){
            this.languageEventSubscription.unsubscribe();
        }
    }
}