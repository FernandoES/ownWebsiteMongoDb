import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { catchError, from, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AppAccountService } from 'src/app/app-account/app-account.service';
import { DatabaseHandlerService } from 'src/utils/database-handler.service';
import { NotificationService } from 'src/utils/notification.service';
import { IBlogEntry } from '../app-user.service';
import { AppArticleService } from './app-article.service';

@Component({
  selector: 'app-article',
  templateUrl: './app-article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppArticleComponent {
  error$ = new Subject<string>();

  public article$: Observable<IBlogEntry> = this._route.params.pipe(
    switchMap(params => from(this._service.fetchSigleArticle(params['id']))),
    tap(response => this.userMail = response.authorMail ?? ''),
    catchError(e => {
      this.error$.next(e.error.status);
      return of();
    })
    );
    userMail: string;
    get showEditButton() {
      return this._accountService.logged && (!this.userMail || this.userMail === this._dataBaseHalderService.userMail);
    }

  constructor(
    private _service: AppArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AppAccountService,
    private _dataBaseHalderService: DatabaseHandlerService,
    private _notification: NotificationService) { }

    deleteArticle(article: IBlogEntry){
      this._service.deleteArticle(article._id ?? '').then(() => {
          this._notification.success('blogList.articleDeleted');
          this._router.navigateByUrl('');
        })
        .catch((e: any) => this._notification.error(e));
    }

    editArticle(article: IBlogEntry) {
      this._router.navigateByUrl(`/edit/${article._id}`);
    }
}
