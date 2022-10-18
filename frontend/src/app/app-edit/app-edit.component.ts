import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AppAccountService } from '../app-account/app-account.service';

@Component({
  selector: 'app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-edit'
  }
})
export class AppEditComponent {
  userMail: string;
  userPassword: string;
  entryId: string;
  constructor(public service: AppAccountService, private _ref: ChangeDetectorRef) {
    
   }

}
