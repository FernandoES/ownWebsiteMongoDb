import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AppAccountService } from 'src/app/app-account/app-account.service';
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
    switchMap(params => this.service.fetchSigleArticle(params['id'])),
    tap(response => this.userMail = response.authorMail ?? ''),
    switchMap(response => {
      if (response?.imageName) {
        return this.service.fetchImage(response.imageName).pipe(map(imagePath => {
          return {...response, imagePath: imagePath}}));
      }
      return of(response);
    }),
    catchError(e => {
      this.error$.next(e.error.status);
      return of();
    })
    );
    userMail: string;
    get showEditButton() {
      return this.accountService.logged && (!this.userMail || this.userMail === this.accountService.userMail);
    }

  constructor(
    public service: AppArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
    public accountService: AppAccountService,
    private notification: NotificationService) { }

    deleteArticle(article: IBlogEntry){
      this.service.deleteArticle(article._id ?? '').subscribe(
        {next: () => {
          this.notification.success('blogList.articleDeleted');
          this._router.navigateByUrl('');
        },
        error: e => this.notification.error(e.status)}
      );
    }

    editArticle(article: IBlogEntry) {
      this._router.navigateByUrl(`/edit/${article._id}`);
    }
}
