import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBlogComponent } from './app-blog.component';

const routes: Routes = [{
  path:'',
  component: AppBlogComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBlogRoutingModule { }
