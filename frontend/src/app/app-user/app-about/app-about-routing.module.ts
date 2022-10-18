import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAboutComponent } from './app-about.component';

export const routes: Routes = [{
    path: '',
    component: AppAboutComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAuthorRoutingModule {}