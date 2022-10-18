import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppEditComponent } from './app-edit.component';

const routes: Routes = [{
  path: '',
  component: AppEditComponent
},
{
  path: ':id',
  component: AppEditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppEditRoutingModule { }
