import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlogEntry, UserService } from '../app-user.service';
import { compareArticlesByDate } from 'src/utils/functions/compareArticlesByDate';

@Component({
  selector: 'app-blog',
  templateUrl: './app-blog.component.html',
  styleUrls: ['./app-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-blog'
  }
})
export class AppBlogComponent implements OnInit {
  articles: IBlogEntry[] = [];

  public blogList$: Observable<IBlogEntry[]> = this._userService.fetchArticlesList().pipe(switchMap(articles => 
    forkJoin((articles ?? []).sort(compareArticlesByDate).map(article => {
      this.articles.push(article);
      if(article.imageName) {
        return this._userService.fetchImage(article.imageName).pipe(map(imagePath => ({...article, imagePath: imagePath})));
      }
      else {
        return of(article);
      }
    }))));

  constructor(
    private _userService: UserService, 
    private _router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void { }

  goToArticle(item: IBlogEntry) {
    this._router.navigate([this.getArticleLink(item)], { relativeTo: this.route})
  }

  getArticleLink(item: IBlogEntry): string {
    return `../article/${item._id}`;
  }
}
