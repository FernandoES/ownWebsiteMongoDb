import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSuggestionComponent } from './app-suggestion.component';

const routes: Routes = [{
  path: '',
  component: AppSuggestionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSuggestionsRoutingModule { }
