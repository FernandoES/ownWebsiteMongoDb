import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/utils/notification.service';
import { AppAccountService } from '../app-account.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './app-restore-password.component.html',
  styleUrls: ['./app-restore-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-restore-password'
  }
})
export class AppRestorePasswordComponent {
  @ViewChild('restoreForm', { static: true }) restoreForm: NgForm;
  userMail: string;
  oldPassword: string;
  newPassword: string;
  constructor(private _service: AppAccountService, private _notification: NotificationService) {
    this._resetValues();
  }

  submitRestore(){
    if(this.restoreForm.invalid) {
      return;
    }
    this._service.restorePassword(this.userMail, this.oldPassword, this.newPassword).subscribe({next:_ => {
      this._notification.success("account.restored");
      this.resetForm(true);
    }});
  }

  resetForm(avoidInform: boolean = false){
    this._resetValues();
    this.restoreForm.form.markAsPristine();
    if(!avoidInform) { 
      this._notification.success("common.reset");
    }
  }

  private _resetValues() {
    this.userMail = "";
    this.oldPassword = "";
    this.newPassword = "";
  }
}
