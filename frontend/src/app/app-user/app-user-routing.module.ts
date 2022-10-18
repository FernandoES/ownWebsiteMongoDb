import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserComponent } from './app-user.component';

export const appUserRoutes: Routes = [
    {
        path: '',
        component: AppUserComponent,
        children: [
            {
                path: '',
                redirectTo: 'blog',
                pathMatch: 'full',
            },
            {
                path: 'blog',
                loadChildren: () => import('./app-blog/app-blog.module').then(m => m.AppBlogModule)
            },
            {
                path: 'suggestion', 
                loadChildren: () => import('./app-suggestion/app-suggestion.module').then(m => m.AppSuggestionModule)
            },
            {
                path: 'article/:id',
                loadChildren: () => import('./app-article/app-article.module').then(m => m.AppArticleModule)
            },
            {
                path: 'about',
                loadChildren: () => import('./app-about/app-about.module').then(m => m.AppAboutModule)
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(appUserRoutes)],
    providers: [],
    exports: [RouterModule],
  })
  export class AppUserRoutingModule {}