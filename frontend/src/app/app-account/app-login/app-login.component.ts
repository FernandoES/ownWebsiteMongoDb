import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-login'
  }
})
export class AppLoginComponent {
  @ViewChild('loginForm', { static: true }) loginForm: NgForm;
  userMail: string;
  password: string;
  constructor(private _service: AppAccountService, private _notification: NotificationService) {
    this._resetValues();
   }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    return this._service.sendLogin(this.userMail, this.password)
      .then(_ => this._notification.success('account.loggedIn'))
      .catch(_ => this._notification.error('account.notLoggedIn'));
   }

   resetForm(avoidInform: boolean = false) {
    this._resetValues();
    this.loginForm.form.markAsPristine();
    if(!avoidInform) { 
      this._notification.success("common.reset");
    }
   }

   private _resetValues(){
    this.userMail = "";
    this.password = "";
   }

}
