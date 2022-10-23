import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/utils/notification.service';
import { AppSuggestionsService, ISuggestion } from './app-suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './app-suggestion.component.html',
  styleUrls: ['./app-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-suggestion'
  } 
})
export class AppSuggestionComponent{
  @ViewChild('suggestionForm', { static: true }) suggestionForm: NgForm;
  suggestion: ISuggestion;
  constructor(private _service: AppSuggestionsService, private _notification: NotificationService, private _ref: ChangeDetectorRef) {
    this._resetSuggestion();
   }

  sendSuggestion(){
    if(this.suggestionForm.invalid){
      return;
    }
    const suggestion = this.suggestionForm.value;
    this._service.sendSuggestions(suggestion)
    .then(_ => {
    this._notification.success("suggestions.sent");
      this.resetForm(true);
    });
  }

  resetForm(avoidInform?: boolean){
    this._resetSuggestion();
    this.suggestionForm.form.markAsPristine();
    this._ref.markForCheck();
    if(!avoidInform) { 
      this._notification.success("common.reset");
    }
  }

  private _resetSuggestion() {
    this.suggestion = {
      authorName: "",
      authorMail: "",
      body: "",
    }
  }
}
