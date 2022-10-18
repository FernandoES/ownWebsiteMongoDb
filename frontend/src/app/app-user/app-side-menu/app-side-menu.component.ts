import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { IBlogEntry, UserService } from '../app-user.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './app-side-menu.component.html',
  styleUrls: ['./app-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-side-menu'
  }
})
export class AppSideMenuComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  articles: IBlogEntry[] = [] as IBlogEntry[];
  searchMatches: IBlogEntry[] = [] as IBlogEntry[];
  get articlePath() {
    return "user/article";
  }
  constructor(
    private _userService: UserService,
    private _router: Router
    ) {
      this._userService.fetchArticlesList().subscribe(articles => this.articles = articles);
     }

  goToLatestArticle($event: Event) {
    $event.stopPropagation();
    const selectedId = this.articles[this.articles.length - 1]?._id;
    if (selectedId){
      this.goToArticle(selectedId);
      this.trigger.closeMenu();
    }
  }
  
  goToRandomArticle($event: Event){
    $event.stopPropagation();
    const selectedId = this.articles[Math.floor(Math.random() * this.articles.length)]?._id;
    if(selectedId) {
      this.goToArticle(selectedId);this.trigger.closeMenu(); 
    }
  }

  goToArticle(articleId: string) {
    this._router.navigateByUrl(`${this.articlePath}/${articleId}`)
  }

  onArticleSelected($event: MatAutocompleteSelectedEvent) {
    this.goToArticle($event.option.value._id);
    this.trigger.closeMenu(); 
  }
  
  onArticleSearchChange(input: string) {
    const lowerCaseInput = input.toLocaleLowerCase();
    this.searchMatches = this.articles.filter(a => a.title.toLocaleLowerCase().includes(input));
  }
}
