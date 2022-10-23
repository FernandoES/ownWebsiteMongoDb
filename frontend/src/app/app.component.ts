import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/language/language.service';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';

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
  constructor(language: LanguageService, databaseHandlerService: DatabaseHandlerService) {
    language.init();
    databaseHandlerService.initDatabaseApp();
    databaseHandlerService.logIn();
  }
}
