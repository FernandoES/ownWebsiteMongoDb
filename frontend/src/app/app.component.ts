import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { LanguageService } from 'src/language/language.service';
import { AppAccountService } from './app-account/app-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  subscriptions: Subscription[];
  constructor(language: LanguageService, accountService: AppAccountService) {
    language.init();
    accountService.loginAnonymously()
  }
}
