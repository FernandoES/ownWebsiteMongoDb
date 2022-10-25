import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './user-resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      user: UserResolver
    },
    children: [
    {
      path: '',
      redirectTo: 'user',
      pathMatch: 'full',
    },
    {
      path: 'user', 
      loadChildren: () => import('./app-user/app-user.module').then(m => m.AppUserModule)
    },
    {
      path: 'edit',
      loadChildren: () => import('./app-edit/app-edit.module').then(m => m.AppEditModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./app-account/app-account.module').then(m => m.AppAccountModule)
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'corrected'
})
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
