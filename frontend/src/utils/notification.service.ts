import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/language/language.service';

export enum NotificationType {
    "Error" = "toast-error",
    "Success" = "toast-success",
}
@Injectable()
export class NotificationService {
    constructor(private _toastr: ToastrService, private _languageService: LanguageService) { }

    success(message?: string | undefined, title?: string | undefined): ActiveToast<any> {
        return this.show(message,title, NotificationType.Success);
    }

    error(message?: string | undefined, title?: string | undefined): ActiveToast<any> {
        return this.show(message, title, NotificationType.Error );
    }

    show(message?: string | undefined, title?: string | undefined, type?: string | undefined): ActiveToast<any> {
        let translatedMessage;
        let translatedTitle;
        if (message) {
            translatedMessage = this._languageService.translate(message);
        }
        if (title) {
            translatedTitle = this._languageService.translate(title);
        }
        return this._toastr.show(translatedMessage, translatedTitle, undefined, type);
    }
    
}