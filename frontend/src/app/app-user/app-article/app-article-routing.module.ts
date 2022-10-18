import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppArticleComponent } from './app-article.component';

const routes: Routes = [{
  path: '',
  component: AppArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppArticleRoutingModule { }
