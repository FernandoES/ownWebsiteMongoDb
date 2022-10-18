import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSuggestionsRoutingModule } from './app-suggestion-routing.module';
import { AppSuggestionComponent } from './app-suggestion.component';
import { FormsModule } from '@angular/forms';
import { AppSuggestionsService } from './app-suggestion.service';
import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { LanguageModule } from 'src/language/language.module';


@NgModule({
  declarations: [
    AppSuggestionComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FormsModule,
    AppSuggestionsRoutingModule,
    MatInputModule,
    FlexLayoutModule,    
    MatButtonModule, 
    LanguageModule
  ],
  providers: [AppSuggestionsService]
})
export class AppSuggestionModule { }
