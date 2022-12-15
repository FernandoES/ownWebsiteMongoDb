import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { LanguageService } from 'src/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  loading = true;
  subscriptions: Subscription[];
  constructor(language: LanguageService, private _router: Router) {
    language.init();
    this._router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd),
      map(e => e instanceof NavigationStart)
    ).subscribe(loading => this.loading = loading);
  }
}
